from matcher.model.user import User
from matcher.rec_engine import get_similarity
from matcher.db import _db

from typing import List
import json


class SingleUserMatches:
    def __init__(self, current_user: User):
        self.current_user = current_user
        self.score_tuple_list = self._add_scores_to_users(self._get_possible_matches())
        self.best_match_index = 0
        self.worst_match_index = len(self.score_tuple_list) - 1

    # TODO: should we shift to using user_id everywhere?

    # helper function that will return the list of users for the person in question. Each user is a json object
    # it will filter out people who are not possible matches -> self and previous people you've already met
    def _get_possible_matches(self):
        # query = User.query()
        query = _db.collection(u"User")
        query: List[User] = [User(**(snapshot.to_dict())) for snapshot in query.get()]
        # returns users that arent self
        output = []  # list of Users TODO: change to user_id?

        for user in query:
            if user.id == self.current_user.id:
                continue

            if user.survey_results is None or len(user.survey_results) == 0:
                continue

            if user.question_weights is None or len(user.question_weights) == 0:
                continue

            if user not in self.current_user.already_met:
                output.append(user)
        return output

    # returns list of user,score tuples sorted from high to low score
    def _add_scores_to_users(self, possible_match_list: List[User]):
        score_tuple_list = []
        for user in possible_match_list:
            score_tuple_list.append((user, get_similarity(self.current_user, user)))
        sorted(score_tuple_list, key=lambda x: x[1])
        return score_tuple_list

    # given a list of possible matche list with scores and the number of matches desired, it will return the top numMatches amount of users
    # return type: json with list of Users (It is a json list essentially)
    def get_n_best_matches(self, num_matches: int) -> List[User]:
        return [i[0] for i in self.score_tuple_list[:num_matches]]

    # given a list of possible matche list with scores and the number of matches desired, it will return the top numMatches amount of users
    # return type: json with list of Users
    def get_n_worst_matches(self, num_matches: int) -> List[User]:
        return [i[0] for i in self.score_tuple_list[-num_matches:]]
