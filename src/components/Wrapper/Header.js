import React, { useState, useEffect } from 'react';

import './../../index.css';
import './Wrapper.css';

function Header({ userEmail }) {

  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    fetch(`/profile/${userEmail}`)
    .then(response => response.json())
    .then(setUserProfile)
    .catch(console.error);
  }, [userEmail]);

  if (userProfile) {
    return (
      <>
        <div className="header">
          <img src="images/logo/logo.svg" className="logo" alt="" />
          <img src={userProfile.profile_picture} className="header-profile" onClick={() => window.location = "/"} alt=""/>
        </div>
      </>
    );
  }
  return <></>;
}

export default Header;
