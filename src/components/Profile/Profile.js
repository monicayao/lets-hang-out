import React from "react";

import "./Profile.css";
import "./../../index.css";
import QuestionsArray from "./../Survey/QuestionsArray";

// left panel with name, position and personal info
function PersonalInfoPanel({ profileUrl, name, position, startDate, location }) {
    return (
        <div className="left-panel">
            <img src={profileUrl} className="profile-image" alt=""/>
            <p className="profile-text profile-title">{name}</p>
            <p className="profile-text">{position}</p>
            <p className="profile-text profile-header">Started</p>
            <p className="profile-text">{startDate}</p>
            <p className="profile-text profile-header">Location</p>
            <p className="profile-text">{location}</p>
            <img src="images/insights/insight-blocks.png" srcSet="images/insights/insight-blocks@2x.png 2x, images/insights/insight-blocks@3x.png 3x" className="insights-image" alt="" />
        </div>
    );
}

// right top panel
function AboutMePanel({ what, wisdom, team, email, officePhone, mobilePhone }) {
  // TODO: only show if != null
  return (
    <div className="right-top-panel">
      <p className="info-text info-title">About Me</p>
      <div className="info-list">
        <p className="info-text info-header">What I Do</p>
        <p className="info-text">{what}</p>
        <p className="info-text info-header">Words of Wisdom</p>
        <p className="info-text">{wisdom}</p>
        <p className="info-text info-header">My Teams</p>
        <p className="info-text">{team}</p>
        <a href={"mailto:" + email}><p className="info-text info-email">{email}</p></a>
        <p className="info-text"><span className="info-phone">O:</span> {officePhone}</p>
        <p className="info-text"><span className="info-phone">M:</span> {mobilePhone}</p>
      </div>
    </div>
  );
}

function MatchesPanel( { matches }) {
  // TODO: matches has image and url to image
  // TODO: change to {matches.size}
  return (
    <div className="matches-panel">
      <p className="info-text info-title">My New Matches (x)</p>
      <div className="matches-scroll">
        <img className="match-scroll-image" src="images/match-profiles/match-profile1.png" alt=""/>
        <img className="match-scroll-image" src="images/match-profiles/match-profile2.png" alt=""/>
        <img className="match-scroll-image" src="images/match-profiles/match-profile3.png" alt=""/>
        <img className="match-scroll-image" src="images/match-profiles/match-profile4.png" alt=""/>
        <img className="match-scroll-image" src="images/match-profiles/match-profile5.png" alt=""/>
        <img className="match-scroll-image" src="images/match-profiles/match-profile6.png" alt=""/>
      </div>
    </div>
  );
}

function HistoryPanel( { matches }) {
  // TODO: matches has image and url to image
  // TODO: change to {matches.size}
  return (
    <div className="history-panel">
      <p className="info-text info-title">My Saved Matches (x)</p>
      <div className="matches-scroll">
        <img className="match-scroll-image" src="images/match-profiles/match-profile1.png" alt=""/>
        <img className="match-scroll-image" src="images/match-profiles/match-profile2.png" alt=""/>
        <img className="match-scroll-image" src="images/match-profiles/match-profile3.png" alt=""/>
        <img className="match-scroll-image" src="images/match-profiles/match-profile4.png" alt=""/>
        <img className="match-scroll-image" src="images/match-profiles/match-profile5.png" alt=""/>
        <img className="match-scroll-image" src="images/match-profiles/match-profile6.png" alt=""/>
      </div>
    </div>
  );
}

function QuestionsPanel({ questions }) {
  return (
    <div className="questions-panel">
      <p className="info-text info-title">My Questions ({QuestionsArray.length})</p>
      <div className="questions-list">
        {QuestionsArray.map((question, index) => 
          <p className="questions-text" key={index}>{question.Question}</p>
        )}
      </div>
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

export { PersonalInfoPanel, AboutMePanel, MatchesPanel, HistoryPanel, QuestionsPanel, GamesPanel, BlueButton, TextButton };