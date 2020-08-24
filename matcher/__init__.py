import dataclasses, json
import atexit
from flask import Flask
from flask_login import LoginManager


class EnhancedJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if dataclasses.is_dataclass(o):
            return dataclasses.asdict(o)
        return super().default(o)


app = Flask(__name__)
app.json_encoder = EnhancedJSONEncoder
login = LoginManager(app)

from matcher.zall_scraper import Scraper

scraper = Scraper()

import matcher.views

def quit_gecko():
    if scraper is not None and scraper.driver is not None:
        scraper.driver.quit()

atexit.register(quit_gecko)