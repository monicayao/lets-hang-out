import React, { useState, useEffect } from 'react';

import './../../index.css';
import './Matches.css';

// function saveMatch({profile}) {
//   // TODO: remove from match list, add to historical match list (update), add to already matched
// }

// function removeMatch({profile}) {
//   // TODO: remove from match list, add to already matched
// }

// each match
// function Match({profile}) {
  
//   // TODO: float image left, float text right
//   // TODO: check if stars work, check color
//   // image, name, position, match score, stars
//   return (
//     <>
//     <Header />
//       <td className="match">
//         {/* <img className="match-profile-image" src="{profile.imageUrl}"/> */}
//         <img className="match-profile-image" src="images/user_profile.jpg" />
//       </td>
//       <td className="match">
//         <div className="match-profile-info">
//           <p>{profile.first_name} {profile.last_name}</p>
//           <p>{profile.position}</p>
//           <p>{profile.score}</p>
//           <div className="rating">
//             <span>☆</span>
//             <span>☆</span>
//             <span>☆</span>
//             <span>☆</span>
//             <span>☆</span>
//           </div>
//         </div>
//       </td>
//       <td>
//         <a href="#" class="close" onClick={removeMatch(profile)}></a>
//       </td>
//     </>
//   );
  
// }
  
function MatchImage({ matchEmail, index }) {

  const userId = matchEmail.substring(0, matchEmail.indexOf('@'));

  const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
      fetch(`/profile/${matchEmail}`)
      .then(response => response.json())
      .then(setUserProfile)
      .catch(console.error);
    }, [matchEmail]);
  
  if (userProfile) {
    return (
      <a href={`/${userId}`}><img className="match-img" id={`match${index}`} src={userProfile.profile_picture} alt="" /></a>
    );
  }
  return <></>;
}

// list of matches
function MatchList({userEmail, num_matches}) {

  // fetch data
  // see https://dev.to/savagepixie/fetching-data-with-react-hooks-2mc5
  const [matches, setMatches] = useState(null);
  useEffect(() => {
    fetch(`/matches/${userEmail}`)
    .then(response => response.json())
    .then(setMatches)
    .catch(console.error);
  }, [userEmail]); // TODO: add num_matches body: JSON.stringify({ num_matches: {num_matches} })
  // TODO: add to dependency array?

  console.log(matches);
  // TODO: REMOVE
  const similar = ["cherm@zillowgroup.com", "ericcao@zillowgroup.com", "sunilku@zillowgroup.com"];
  const dissimilar = ["trevorn@zillowgroup.com", "ziniz@zillowgroup.com", "ryantr@zillowgroup.com"];

  // list matches
  if (matches) {
    return (
      <>
        <div className="match-text-wrapper">
          <p className="match-text">Great! We found some matches for you.</p>
        </div>
        <div className="match-grid">
          <span className="outermost-circle"></span>
          <span className="middle-circle"></span>
          <span className="innermost-circle"></span>
          <img src="images/icon-reload/icon-reload.svg" className="icon-reload" alt="" />
          {/* TODO: ADD onClick */}

          <div className="match-images-wrapper">
            {/* TODO: CHANGE TO matches.similar and matches.dissimilar */}
            {similar.map((match, i) => <MatchImage matchEmail={match} index={i+1} />)}
            {dissimilar.map((match, i) => <MatchImage matchEmail={match} index={i+4} />)}
          </div>
        </div>
        {/* <div className="match-row">
          <div className="match-column">
            <h3>Most Similar</h3>
            <table>
              <tbody>
                {matches.similar.map((match) =>
                  <tr key={match.uid}>
                    <Match profile={match} />
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="match-column">
            <h3>Most Dissimilar</h3>
            <table>
              <tbody>
                {matches.dissimilar.map((match) =>
                  <tr key={match.uid}>
                    <Match profile={match} />
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div> */}
      </>
    );
  }
  return <></>;
}

export default MatchList;
