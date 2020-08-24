import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import "./Profile.css";
import "./../../index.css";
import { PersonalInfoPanel, AboutMePanel, MatchesPanel, SavedMatchesPanel, QuestionsPanel, BlueButton, TextButton } from "./ProfileElements";

function MyProfile({ userEmail, num_matches }) {

    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
      fetch(`/profile/${userEmail}`)
      .then(response => response.json())
      .then(setUserProfile)
      .catch(console.error);
    }, [userEmail]);
    console.log(userProfile);

    const [matches, setMatches] = useState(null);
    useEffect(() => {
      fetch(`/matches/${userEmail}`) // TODO: add num_matches
      .then(response => response.json())
      .then(setMatches)
      .catch(console.error);
    }, [userEmail]);
    console.log(matches);

    // let savedMatchesStates = [];
    // for (saved in userProfile.already_met) {
    //   savedMatchesStates.push()
    // }

    let blueButtonText = "See my matches!";
    let blueButtonUrl = "/matches";
    let questionsTextButtonUrl = "/viewsurvey";
    if (userProfile && Object.keys(userProfile.survey_results).length === 0) {
        console.log(userProfile)
        blueButtonText = "Go to survey";
        blueButtonUrl = "/survey";
        questionsTextButtonUrl = "/survey";
    }

    if (userProfile && matches) {
        return (
            <div className="profile-wrapper">
                <PersonalInfoPanel profileUrl={userProfile.profile_picture} name={userProfile.name} position={userProfile.position} startDate={userProfile.started} 
                location={userProfile.location} insights={userProfile.insights} />
        
                <AboutMePanel what={userProfile.what_i_do} wisdom={userProfile.words_of_wisdom} teams={userProfile.teams} email={userEmail} 
                officePhone={userProfile.office_phone_number} mobilePhone={userProfile.mobile_phone_number}/>
                <BlueButton text={blueButtonText} url={blueButtonUrl} />
        
                <MatchesPanel matches={matches} />
                <TextButton text="View All" url="/matches" buttonClass="text-button-matches" />
        
                <SavedMatchesPanel matches={userProfile.already_met} />
                <TextButton text="View All" url="/savedmatches" buttonClass="text-button-history" />

                <QuestionsPanel />
                <TextButton text="View All / Edit" url={questionsTextButtonUrl} buttonClass="text-button-questions" />
            </div>
        );
    }
    return <></>;
}

const mapStateToProps = (state) => {
    return {
      email: state.email,
    };
};

export default connect(mapStateToProps)(MyProfile);
  