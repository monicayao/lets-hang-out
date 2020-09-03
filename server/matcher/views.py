import json
import dataclasses
import http
from typing import List, Dict, Optional

from matcher import app, scraper
from matcher import EnhancedJSONEncoder
from matcher.get_matches import SingleUserMatches
from matcher.model.user import User
from matcher.zall_scraper import ScrapedUser, Scraper

from flask import request, jsonify, redirect, url_for
from flask_login import current_user, login_user


@app.route("/survey")
def survey():
    return "Survey Page"


@app.route("/matches/<user_id>", methods=["GET"])
def matches(user_id: str):
    try:
        num_matches = int(request.args.get("num_matches"))
    except:
        num_matches = 3

    user: User = User.get(user_id)

    if user is None:
        return ("", http.HTTPStatus.BAD_REQUEST)

    match_list = SingleUserMatches(user)

    results = {}

    results["similar"] = match_list.get_n_best_matches(num_matches)
    results["dissimilar"] = match_list.get_n_worst_matches(num_matches)
    return jsonify(results)


@app.route("/friends", methods=["POST"])
def save_friend():
    """
    This method updates the save status of the friend

    Input of the form
    {
        "user_email": str,
        "friend_email": str,
        "new_save_state": bool
    }
    """
    json: Dict = request.get_json()
    user: User = User.get(json["user_email"])
    user: User = User.get(json["friend_email"])

    if not isinstance(json["new_save_state"], bool):
        return ("", http.HTTPStatus.BAD_REQUEST)

    if user is None or friend is None:
        return ("", http.HTTPStatus.BAD_REQUEST)

    user.saved_friends[json["friend_email"]] = json["new_save_state"]

    user.saved_friends = {
        key: value for key, value in user.saved_friends.items() if value is True
    }  # Force compiler to only allow booleans

    user.save()
    return ("", http.HTTPStatus.NO_CONTENT)


@app.route("/match/ratings", methods=["POST"])
def rate_match():
    """
    This method updates the rating of the friend

    Input of the form
    {
        "user_email": str,
        "friend_email": str,
        "rating": float
    }
    """
    json: Dict = request.get_json()
    user: User = User.get(json["user_email"])
    friend: User = User.get(json["friend_email"])

    if not isinstance(json["rating"], (float, int)):
        return ("", http.HTTPStatus.BAD_REQUEST)

    if user is None or friend is None:
        return ("", http.HTTPStatus.BAD_REQUEST)

    user.ratings[json["friend_email"]] = json["new_save_state"]

    user.ratings = {
        key: value
        for key, value in user.ratings.items()
        if isinstance(value, (float, int))
    }  # Force compiler to only allow booleans

    user.save()
    return ("", http.HTTPStatus.NO_CONTENT)


@app.route("/match", methods=["POST"])
def mark_as_matched():
    """
    This method marks the two friends as having met each other

    Input of the form
    {
        "user_email": str,
        "friend_email": str
    }
    """
    json: Dict = request.get_json()
    user: User = User.get(json["user_email"])
    friend: User = User.get(json["friend_email"])

    if user is None or friend is None:
        return ("", http.HTTPStatus.BAD_REQUEST)

    user.already_met.append(friend)
    friend.already_met.append(user)

    user.already_met = list({i for i in user.already_met})
    friend.already_met = list({i for i in friend.already_met})

    user.save()
    friend.save()
    return ("", http.HTTPStatus.NO_CONTENT)


@app.route("/signin/<email>", methods=["POST"])
def signin(email: str):
    app.logger.info(f'Successfully got result: {request.is_json}')
    res  = request.get_json()

    user: User = User.make(email=email, survey_results=res["survey_results"])
    user.id = email

    app.logger.info(f'Scraping info about {email}')
    scraped_info: Optional[ScrapedUser] = scraper.scrape_person_email(email)
    app.logger.info(f'Scraping {email} completed')

    if scraped_info is not None:
        user.import_info(scraped_info)

    user.save()

    return ("", http.HTTPStatus.CREATED)


@app.route("/profile/<user_id>", methods=["GET"])
def profile(user_id: str):
    return jsonify(User.get(user_id))
