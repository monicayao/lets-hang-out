import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import "./Profile.css";
import "./../../index.css";
import { PersonalInfoPanel, AboutMePanel, GamesPanel, BlueButton, TextButton } from "./ProfileElements";

function MatchProfile({ match }) {

    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
      fetch(`/profile/${match.params.userId}@zillowgroup.com`)
      .then(response => response.json())
      .then(setUserProfile)
      .catch(console.error);
    }, [match.params.userId]);

    if (userProfile) {
        return (
            <div className="profile-wrapper">
                <PersonalInfoPanel profileUrl={userProfile.profile_picture} name={userProfile.name} position={userProfile.position} startDate={userProfile.started} 
                location={userProfile.location}  insights={userProfile.insights} />
        
                <AboutMePanel what={userProfile.what_i_do} wisdom={userProfile.words_of_wisdom} teams={userProfile.teams} email={match.params.userId + "@zillowgroup.com"} 
                officePhone={userProfile.office_phone_number} mobilePhone={userProfile.mobile_phone_number}/>
                <BlueButton text="Chat On Slack" url={`https://zillowgroup.slack.com/${match.params.userId}`} />
        
                <GamesPanel />
                <TextButton text="View All" url="/matches" buttonClass="text-button-matches" />
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

export default connect(mapStateToProps)(MatchProfile);
  