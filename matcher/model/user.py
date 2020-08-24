import firestore_model
import matcher.db
from dataclasses import dataclass, field
from firestore_model import Model, Query
from flask_login import UserMixin
from matcher import login
from typing import Dict, List, Optional

from itertools import product

from random import choice, random

from matcher.model.scraped_user import ScrapedUser


@dataclass
class User(UserMixin, Model):
    email: str = ""

    profile_picture: str = ""
    insights: List[str] = field(default_factory=lambda: [])
    name: str = ""
    position: str = ""
    office_phone_number: str = ""
    mobile_phone_number: str = ""
    started: str = ""
    location: str = ""
    teams: List[str] = field(default_factory=lambda: [])
    what_i_do: str = ""
    words_of_wisdom: str = ""

    # Key: "question,choice"
    question_weights: Dict[str, float] = field(default_factory=lambda: {})
    survey_results: Dict[str, bool] = field(default_factory=lambda: {})

    # Relations with others (str typically refers to emails here)
    already_met: List[str] = field(default_factory=lambda: [])
    ratings: Dict[str, float] = field(default_factory=lambda: {})
    saved_friends: Dict[str, bool] = field(default_factory=lambda: {})

    def import_info(self, info: ScrapedUser):
        self.profile_picture = info.profile_picture
        self.insights = info.insights
        self.name = info.name
        self.position = info.position
        self.email = info.email
        self.office_phone_number = info.office_phone_number
        self.mobile_phone_number = info.mobile_phone_number
        self.started = info.started
        self.location = info.location
        self.teams = info.teams
        self.what_i_do = info.what_i_do
        self.words_of_wisdom = info.words_of_wisdom


@login.user_loader
def load_user(email: str):
    return User.get(email)


def create_test_users():
    """Example of how we create test users"""
    questions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    options = ["a", "b", "c", "d", "e"]

    zipped_options = product(questions, options, repeat=1)
    linearized_options = [a + b for a, b in zipped_options]

    for i in range(10):
        results = {}

        for q in questions:
            for o in options:
                results[q + o] = False
            results[q + choice(options)] = True

        m = User.make(
            first_name="Test",
            last_name=f"User{i}",
            position="Meep",
            question_weights={key: random() for key in linearized_options},
            survey_results=results,
            already_met=[],
            save=True,
        )
