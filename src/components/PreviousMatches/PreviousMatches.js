import React, { useState, useEffect } from 'react';
import './../../index.css';
import './../Profile/Profile.css';
import './PreviousMatches.css';
import firebase from '../../backend/Firebase' 
import SavedMatch from "./StarRating"
import { PersonalInfoPanel, CloseButton } from "./../Profile/ProfileElements";

const db = firebase.firestore();

// list of matches
function PreviousMatches({ userEmail }) {

    // fetch data
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
      fetch(`/profile/${userEmail}`)
      .then(response => response.json())
      .then(setUserProfile)
      .catch(console.error);
    }, []);

    // TODO: REMOVE AND CHANGE BELOW
    const already_met = ["ingridt@zillowgroup.com"];

    // list matches
    if (userProfile) {
      return ( 
        <div className="saved-matches-wrapper">
          <PersonalInfoPanel profileUrl={userProfile.profile_picture} name={userProfile.name} position={userProfile.position} startDate={userProfile.started} 
                  location={userProfile.location} insights={userProfile.insights} />
          <div className="saved-matches-right-panel">
            <p className="saved-match-text saved-match-title">Your Saved Matches</p>
            {/* <ul className="saved-match-list"> */}
            <div className="saved-matches-list">
              {/* {userProfile.already_met.map((match) => <SavedMatch userEmail={match} />)} */}
              {already_met.map((match) => <SavedMatch userEmail={userEmail} matchEmail={match} />)}
            </div>
          </div>

          <CloseButton url="/" />
        </div>
      );
    }
    return <></>;
  }    

export default PreviousMatches;