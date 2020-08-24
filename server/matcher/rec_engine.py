"""Recommender engine for determining similarity between friends"""

from typing import Set, Dict

import numpy as np
from scipy.stats import wasserstein_distance

from matcher.model.user import User


def get_shared_questions(u: User, v: User) -> Set[str]:
    """
    Pick out shared questions and impose an ordering
    """
    u_questions = set(u.question_weights.keys())
    v_questions = set(v.question_weights.keys())

    return u_questions.intersection(v_questions)


def get_similarity(u: User, v: User) -> float:
    shared_questions = get_shared_questions(u, v)

    # Here we assume that the format of survey results is a one-hot encoding of the survey questions (to avoid issues with categorical values)
    u_values = np.array(
        [float(u.survey_results[question]) for question in shared_questions]
    )
    v_values = np.array(
        [float(v.survey_results[question]) for question in shared_questions]
    )

    u_weights = np.array(
        [float(v.question_weights[question]) for question in shared_questions]
    )
    v_weights = np.array(
        [float(u.question_weights[question]) for question in shared_questions]
    )

    return wasserstein_distance(u_values, v_values, u_weights, v_weights)


def update(
    current_user: User, matched_user: User, positive_experience: bool
) -> Dict[str, float]:
    """Returns what the user preferences should be updated to after matching with the other user.
    
    Note: This does not update in place to allow both users to calculate what they should update to before updating.
    Note: This does not learn from negative experiences (Many ML models don't).
    """
    if positive_experience:
        return current_user.question_weights
    # This update is rather straneg due to the fact that not all questions are shared, but we do the best we can
    shared_questions = get_shared_questions(current_user, matched_user)

    recorded_questions = []
    recorded_weights = []

    for question, curr_weight in current_user.question_weights:
        recorded_questions.append(question)

        if question not in shared_questions:
            recorded_weights.append(curr_weight)
        else:
            updated_value = (
                0.85 * curr_weight
                + 0.1 * (1.0 - int(matched_user.survey_results[question]))
                + 0.05 * (1.0 - int(matched_user.question_weights[question]))
            )
            recorded_weights.append(updated_value)

    # Normalize Weights to a Probability distribution
    normalized_weights = np.array(recorded_weights)
    normalized_weights /= np.linalg.norm(recorded_weights)

    return dict(zip(recorded_questions, normalized_weights))
