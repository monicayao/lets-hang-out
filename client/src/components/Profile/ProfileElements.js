import React, {useState, useEffect} from "react";

import "./Profile.css";
import "./../../index.css";
import QuestionsArray from "../Survey/QuestionsArray";

// left panel with name, position and personal info
function PersonalInfoPanel({ profileUrl, name, position, startDate, location, insights }) {
  
    if (!insights) {
      insights = [];
    }

    return (
        <div className="left-panel">
            <div className="profile-image-wrapper">
              <img src={profileUrl} className="profile-image" alt="" />
            </div>
            <p className="profile-text profile-title">{name}</p>
            <p className="profile-text">{position}</p>
            <p className="profile-text profile-header">Started</p>
            <p className="profile-text">{startDate}</p>
            <p className="profile-text profile-header">Location</p>
            <p className="profile-text">{location}</p>
            <div className="profile-insights">
              {insights.map((insight) => 
              <>
                <img src={`images/insights/insight-blocks-${insight.slice(-1)}.png`} srcSet={`images/insights/insight-blocks@2x-${insight.slice(-1)}.png, images/insights/insight-blocks@3x-${insight.slice(-1)}.png`} className="insights-image" alt="" />
                <br/>
              </>)}
            </div>
        </div>
    );
}

// right top panel
function AboutMePanel({ what, wisdom, teams, email, officePhone, mobilePhone }) {
  // TODO: check if this works
  // let text;
  // if (what != null) {
  //   text = <><p className="info-text info-header">What I Do</p><p className="info-text">{what}</p></>;
  // }
  // if (wisdom != null) {
  //   text += <p className="info-text info-header">Words of Wisdom</p>;
  //   text += <p className="info-text">{wisdom}</p>;
  // }

  return (
    <div className="right-top-panel">
      <p className="info-text info-title">About Me</p>
      <div className="info-list">
        <p className="info-text info-header">What I Do</p>
        <p className="info-text">{what}</p>
        <p className="info-text info-header">Words of Wisdom</p>
        <p className="info-text">{wisdom}</p>
        <p className="info-text info-header">My Teams</p>
        {teams.map((team => <p className="info-text">{team}</p>))}
        <a href={"mailto:" + email}><p className="info-text info-email">{email}</p></a>
        <p className="info-text"><span className="info-phone">O:</span> {officePhone}</p>
        <p className="info-text"><span className="info-phone">M:</span> {mobilePhone}</p>
      </div>
    </div>
  );
}

function Match({ matchEmail }) {

  const userId = matchEmail.substring(0, matchEmail.indexOf('@'));

  const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
      fetch(`/profile/${matchEmail}`)
      .then(response => response.json())
      .then(setUserProfile)
      .catch(console.error);
  }, []);

  if (userProfile) {
    return (
      <a href={`/${userId}`}><img className="match-scroll-image" src={userProfile.profile_picture} alt=""/></a>
    );
  }
  return <></>;
}

function MatchesPanel( { matches }) {
  // TODO: REMOVE AND CHANGE BELOW
  const similar = ["cherm@zillowgroup.com", "ericcao@zillowgroup.com", "sunilku@zillowgroup.com"];
  const dissimilar = ["trevorn@zillowgroup.com", "ziniz@zillowgroup.com", "ryantr@zillowgroup.com"];

  return (
    <div className="matches-panel">
      {/* <p className="info-text info-title">My Matches ({matches.similar.length + matches.dissimilar.length})</p> */}
      <p className="info-text info-title">My Matches ({similar.length + dissimilar.length})</p>
      <div className="matches-scroll">
        {/* {matches.similar.map((match) => <Match matchEmail={match} />)}
        {matches.dissimilar.map((match) => <Match matchEmail={match} />)} */}
        {similar.map((match) => <Match matchEmail={match} />)}
        {dissimilar.map((match) => <Match matchEmail={match} />)}
      </div>
    </div>
  );
}

function SavedMatchesPanel( { matches }) {
  // TODO: REMOVE
  matches = ["ingridt@zillowgroup.com"];

  return (
    <div className="saved-matches-panel">
      <p className="info-text info-title">My Saved Matches ({matches.length})</p>
      <div className="matches-scroll">
        {matches.map((match) => <Match matchEmail={match} />)}
      </div>
    </div>
  );
}

function QuestionsPanel({ questions }) {
  return (
    <div className="questions-panel">
      <p className="info-text info-title">My Questions ({QuestionsArray.length})</p>
      {/* <div className="questions-list">
        {QuestionsArray.map((question, index) => 
          <p className="questions-text" key={index}>{question.Question}</p>
        )}
      </div> */}
    </div>
  );
}

function GamesPanel({ games }) {
  return (
    <div className="games-panel">
      <p className="info-text info-title">How about a game together?</p>
      <div className="games-list">
        <a className="games-text" href="https://skribbl.io/">Skribbl</a>
        <br/>
        <a className="games-text" href="https://codenames.game/">Codenames</a>
      </div>
    </div>
  );
}

function BlueButton({ text, url }) {
  return (
    <div className="blue-button-wrapper">
      <button className="blue-button" onClick={() => window.location = url}>{text}</button>
    </div>
  );
}

function TextButton( {text, url, buttonClass }) {
  return (
    <div className={`text-button-wrapper ${buttonClass}`}>
      <a className="text-button " onClick={() => window.location = url}>{text}</a>
    </div>
  );
}

function CloseButton({ url }) {
  return (
    <div className="close-button-wrapper">
      <a href={url}><img src="images/close/icon-close-gray.svg" alt="" /></a>
    </div>
  );
}

export { PersonalInfoPanel, AboutMePanel, MatchesPanel, SavedMatchesPanel, QuestionsPanel, GamesPanel, BlueButton, TextButton, CloseButton };