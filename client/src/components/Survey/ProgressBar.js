import React from "react";

// const ProgressContainer = styled.div`
//     && {
//         height: 5;
//         width: 400;
//         backgroundColor: #d9f2e4;
//         borderRadius: 50;
//         margin: auto;
//         margin-top: 30px;
//         margin-bottom: 30px;
//     }
//   `

//   const ProgressFiller = styled.div`
//   height: 100%;
//   width: ${props => props.completed}%;
//   backgroundColor: #339961;
//   borderRadius: inherit;
//   textAlign: right;
//   transition: ;
// `

// const ProgressLabel = styled.div`
//   padding: 5;
//   color: white;
//   fontWeight: bold;
// `

const ProgressBar = ({completed}) => {
  
    return (
        // <ProgressContainer>
        //     <ProgressFiller completed={completed}>
        //         <ProgressLabel >
        //             completed
        //         </ProgressLabel>
        //     </ProgressFiller>
        // </ProgressContainer>
      <div className="progress-container">
        <div className="progress-filler" style={{width: `${completed}%`}}>
          <span className="progress-label">{`${completed}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;