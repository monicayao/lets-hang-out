// from https://scotch.io/tutorials/build-a-star-rating-component-for-react
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './star-rating.css';
import './PreviousMatches.css';

// TODO: NOT WORKING
function updateRating(userEmail, matchEmail, ratingValue) {
    fetch("/match/ratings", {
        method: "POST",
        body: JSON.stringify({"user_email": {userEmail},
                              "friend_email": {matchEmail},
                              "rating": {ratingValue}})
    })
}

function StarRating({ userEmail, matchEmail }) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        fetch(`/profile/${userEmail}`)
        .then(response => response.json())
        .then((data) => {
            if (data && Object.keys(data.ratings).length !== 0 && Object.keys(data.ratings).includes(matchEmail)) {
                setRating(data.ratings.matchEmail);
            } else {
                setRating(0);
            }
        })
        .catch(console.error);
    }, [userEmail]);
    console.log(rating);

    return(
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <>
                        <input 
                            type="radio" 
                            name="rating" 
                            value={ratingValue} 
                            onClick={() => setRating(ratingValue)}
                        />
                        <FaStar 
                            className='star' 
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5ee9"}
                            onMouseEnter={() => {
                                setHover(ratingValue);
                                updateRating(userEmail, matchEmail, ratingValue);
                            }}
                            onMouseLeave={() => setHover(null)}
                        />
                    </>
                );
            })}
        </div>
    );
};

function SavedMatch({ userEmail, matchEmail }) {

    const matchUserId = matchEmail.substring(0, matchEmail.indexOf('@'));

    const [matchProfile, setMatchProfile] = useState(null);
    useEffect(() => {
      fetch(`/profile/${matchEmail}`)
      .then(response => response.json())
      .then(setMatchProfile)
      .catch(console.error);
    }, []);

    if (matchProfile) {
        return (
            <div className="saved-match-wrapper">
                {/* <img className="match-history-img" src="images/match-profiles/match-profile1.png" alt=""/> */}
                <a href={`/${matchUserId}`}><img className="match-history-img" src={matchProfile.profile_picture} alt=""/></a>
                <p className="saved-match-text saved-match-name">{matchProfile.name}</p>
                <StarRating userEmail={userEmail} matchEmail={matchEmail} />
            </div>
        );
    }
    return <></>;
}

export default SavedMatch;
