import React from 'react';
import { connect } from "react-redux";

import QuestionsArray from './QuestionsArray'
import AnswersToCheckArray from './AnswersToCheckArray'
import "./Survey.css"
import { PersonalInfoPanel, CloseButton } from '../Profile/ProfileElements'
import firebase from '../../backend/Firebase'

const db = firebase.firestore();

class ViewEditSurvey extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        survey_results: null,
        user_profile: null
      };
    }

    // converts from something like question 9, 10a -> 0, which is the index of "a"
    convertFromDBIndex(questionIndex, dbIndex){
        const choice = dbIndex.replace(`${questionIndex+1}`, "");
        const mapToNumber = {"a": 0, "b": 1, "c": 2, "d": 3};
        return mapToNumber[choice];
    }

    // gets all the survey_results for our user
    componentWillMount(){
        const useremail = this.props.email;
        console.log(useremail);
        db.collection("User").doc(useremail).get().then((doc) => {
            if (doc.exists) {
              console.log(doc.data()["survey_results"]);
              this.setState(
                {survey_results: doc.data()["survey_results"]}
              )
            } else {
              console.log("No such document!");
            }
        }).catch(function(error) {
        console.log("Error getting document:", error);
        });

        fetch(`/profile/${useremail}`)
            .then(response => response.json())
            .then(data => this.setState({ user_profile: data }))
            .catch(console.error);
    }

    onClickSurveyButton = () => {
        this.props.history.push("/survey");
    }
    
    // for each question index ex: 9, you have to check 10a, 10b, 10c, 10d. This will return the answer STRING of the one that is true in db
    getAnsForQuestion(questionIndex){
        const dbIndToCheck = AnswersToCheckArray[questionIndex]
        const currentAnswers = QuestionsArray[questionIndex]["Answer"]
        if (this.state.survey_results != null){
            for(let dbInd = 0; dbInd < dbIndToCheck.length; dbInd++){
                if (this.state.survey_results[dbIndToCheck[dbInd]] === true){
                    let ans = currentAnswers[this.convertFromDBIndex(questionIndex, dbIndToCheck[dbInd])];
                    if (typeof ans !== 'string') {
                        return "";
                    }
                    console.log(questionIndex, ans);
                    return ans;
                } 
            }
        }
    }

    // renders all the questions and answers -> css here !!! there's a file called survey.css btw 
    renderAllQA(){
        console.log(this.state.survey_results)
        return(
            <div className="answers-list">
                {QuestionsArray.map((question, index) => 
                    <>
                        <p className="survey-text"><span className="survey-question">{question["Question"]}</span>{" "+this.getAnsForQuestion(index)}</p> 
                    </>
                ) }
            </div>
        )
    }

    render(){
        if (this.state.user_profile) {
            return(
                <div className="answers-wrapper">
                    <PersonalInfoPanel profileUrl={this.state.user_profile.profile_picture} name={this.state.user_profile.name} position={this.state.user_profile.position} 
                    startDate={this.state.user_profile.start} location={this.state.user_profile.location} insights={this.state.user_profile.insights} />

                    <div className="all-answers"> 
                        <p className="survey-text survey-title">My Answers</p>
                        {this.renderAllQA()}
                        <div className="button-wrapper-2">
                            <button className="take-survey-button" onClick={this.onClickSurveyButton}> {/* TODO: update with DB value, add functionality */}    
                                    <span className="aLink">Retake the Survey</span>
                            </button>
                        </div>
                    </div> 

                    <CloseButton url="/" />
                </div>
            );
        }
        return <></>;
    } 
}

const mapStateToProps = (state) => {
    return {
      email: state.email,
    };
};

export default connect(mapStateToProps)(ViewEditSurvey);
