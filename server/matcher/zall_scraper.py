from selenium import webdriver
from pathlib import Path
from typing import Tuple, List, Set, Optional
from dataclasses import dataclass, field
import selenium
from selenium.webdriver.firefox.options import Options
import time

from matcher.model.scraped_user import ScrapedUser


class Scraper:
    BASE_URL: str = "https://skylight.zillowgroup.com"

    def __init__(self):
        self.options = Options()
        self.options.headless = True

        driver = webdriver.Firefox(options=self.options)
        self.driver = driver
        self.emails_to_users = {}  # Mapping of emails to people
        self.url_to_users = {}  # Mapping of urls to people

    def _login_to_okta(self):
        if "Log In ‹ ZG Skylight" in self.driver.title:
            time.sleep(0.5)
            self.driver.find_element_by_xpath("/html/body/div[1]/form[1]/a").click()
            time.sleep(0.5)

    def _sign_into_okta(self):
        def get_okta_credentials() -> Tuple[str, str]:
            with (Path.home() / "okta_cred.txt").open() as f:
                lines = f.readlines()
            username = lines[0]
            password = lines[1]
            return username, password

        if "Inc. - Sign In" in self.driver.title:
            username, password = get_okta_credentials()
            time.sleep(1)
            self.driver.find_elements_by_css_selector("#okta-signin-username")[
                0
            ].send_keys(username)
            time.sleep(1)
            self.driver.find_elements_by_css_selector("#okta-signin-password")[
                0
            ].send_keys(password)
            time.sleep(0.5)
            self.driver.find_elements_by_css_selector("#okta-signin-submit")[0].click()
            time.sleep(0.5)

    def scrape_person_email(self, email: str, force=False) -> Optional[ScrapedUser]:
        if email in self.emails_to_users.keys() and not force:
            return self.emails_to_users[email]

        pos = email.find("@")
        url = Scraper.BASE_URL + "/zallwall/" + email[:pos]

        return self.scrape_person(url, email=email)

    def scrape_person(self, url, force=False, email=None) -> Optional[ScrapedUser]:
        """Scrape user from the given URL. This method autocaches whenever possible, but you can use force to bypass this.

        Additionally, the email parameter is a way for the method to fail fast. If the given email does not match the provided one,
        then it returns None. If there was an error, this method returns None. If the webdriver had an unexpected failure,
        this returns None.
        """
        if url in self.url_to_users.keys() and not force:
            return self.url_to_users[url]

        if self.driver is None:
            self.driver = webdriver.Firefox(options=self.options)

        self.driver.get(url)

        for _ in range(10):
            self._login_to_okta()
            self._sign_into_okta()

            if "Skylight" in self.driver.title:
                break
            else:
                time.sleep(8)

        time.sleep(0.5)
        if "ZG Skylight" not in self.driver.title:
            self.driver.quit()
            self.driver = None
            return None

        if self.driver.current_url != url:
            print(f"{url} does not match {self.driver.current_url}")
            self.driver.get(url)

        try:
            # Create user
            user = ScrapedUser()
            profile_box = self.driver.find_elements_by_class_name("profile-box")[0]
            user.email = str(
                profile_box.find_elements_by_class_name("t_link")[0].text
            ).strip()

            if email is not None and user.email != email:
                return None

            self._scrape_insights(user)
            
            try:
                user.profile_picture = str(self.driver.find_elements_by_class_name('ZallPicture-image')[0].get_attribute("src"))
            except:
                user.profile_picture = ""

            user.name = str(
                self.driver.find_elements_by_class_name("t-heading")[0].text
            )
            user.position = str(
                profile_box.find_elements_by_class_name("t_large")[0].text
            )
            self._scrape_misc(user, profile_box)
            self._scrape_teams(user)

            try:
                user.what_i_do = str(
                    self.driver.find_elements_by_css_selector("#whatido-public")[0].text
                )
            except:
                user.what_i_do = ""

            try:
                user.words_of_wisdom = str(
                    self.driver.find_elements_by_css_selector("#wisdom-public")[0].text
                )
            except:
                user.words_of_wisdom = ""

            self.url_to_users[url] = user
            self.emails_to_users[user.email] = user

            return user
        except Exception as e:
            print(e)
            # Lmao. Giant try-except
            self.driver.quit()
            self.driver = None
            return None

    def _scrape_misc(self, user: ScrapedUser, profile_box):
        misc: List[str] = [
            str(tag.text)
            for tag in profile_box.find_elements_by_css_selector(".t_small > div")
        ]

        for entry in misc:
            if entry.startswith("O: "):
                user.office_phone_number = entry
                continue
            if entry.startswith("M: "):
                user.mobile_phone_number = entry
                continue
            if entry.startswith("Started: "):
                user.started = entry[len("Started: ") :]
                continue
            if entry.startswith("Where I sit/stand: "):
                user.location = entry[len("Where I sit/stand: ") :]

    def _scrape_insights(self, user: ScrapedUser):
        try:
            block = self.driver.find_elements_by_css_selector(".y")[0]
            parent = block.find_element_by_xpath("..")
            children = [
                str(child.get_attribute("class"))
                for child in parent.find_elements_by_tag_name("a")
            ]
            user.insights = children
        except:
            user.insights = []

    def _scrape_new_people(self):
        boss_urls: Set = {
            tag.get_attribute("href")
            for tag in self.driver.find_elements_by_css_selector(
                "a.boss-profile-content"
            )
        }

        reporter_urls = {
            tag.get_attribute("href")
            for tag in self.driver.find_elements_by_css_selector(
                "div.report-header > a"
            )
        }

        return boss_urls.union(reporter_urls)

    def _scrape_teams(self, user: ScrapedUser):
        headers = self.driver.find_elements_by_css_selector("span.team-header")

        teams = [str(tag.text) for tag in headers]
        user.teams = teams
