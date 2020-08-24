import React from 'react';
import { connect } from "react-redux";

import QuestionsArray from './QuestionsArray'
import SurveyResultsArray from './SurveyResultsArray'
import Question from './Question.js'
import Answer from './Answer.js'
import ProgressBar from './ProgressBar.js'
import "./Survey.css"

import firebase from '../../backend/Firebase'

const db = firebase.firestore();

class Survey extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        questionIndex: 0,
        selectedAnswer: null // or pull from db? -- so when empty null
        };
    }

    convertToDBIndex(questionIndex, selectedAnswer){
        const mapToLetter = ["a", "b", "c", "d"];
        return `survey_results.${questionIndex+1}`+mapToLetter[selectedAnswer];
    }

    onClickNextButton(questionIndex, selectedAnswer){
        // push selected answer to the DB
        const newSurveyResults = SurveyResultsArray[questionIndex];
        newSurveyResults[this.convertToDBIndex(questionIndex,selectedAnswer)] = true;
        const useremail = this.props.email;
        console.log(newSurveyResults)
        console.log(useremail)
        db.collection("User").doc(useremail).update(newSurveyResults) 
            .catch(err => {
                console.error(err);
        });
        newSurveyResults[this.convertToDBIndex(questionIndex,selectedAnswer)] = false; // reset back to false in case they click previous (isn't the best but...)
    }

    onClickMatchesButton = () => {
        this.props.history.push("/matches");
    }
    
    renderQuestion(){
        const currentQuestion = QuestionsArray[this.state.questionIndex]["Question"]
        return(
            <Question className="question-rect">{currentQuestion}</Question>
        )
    }

    renderAnswer() {
        const currentAnswers = QuestionsArray[this.state.questionIndex]["Answer"]
        return(
            <>
                    {currentAnswers.map((ans, index) => 
                            <button key={index}
                                className={`answer-btn${index === this.state.selectedAnswer ? "-selected" : ""}`}  
                                onClick={() => this.setState({ selectedAnswer: index })}
                                >
                                    <Answer answer={ans}></Answer>
                            </button>
                    )} 
            </>
        )
    }

    render(){
        const numQuestions = QuestionsArray.length
        
        return(
            <>
            <img src="images/logo/logo.svg" className="logo-survey" alt="" />

                <div className="survey-description">A few questions to help us find you the best hangout buddies!</div>

                <ProgressBar completed={(this.state.questionIndex + 1) * 10} />

                {this.renderQuestion()}
                <div className="answer-container">
                    {this.renderAnswer()}

                    {(this.state.questionIndex > 0 && this.state.questionIndex < numQuestions - 1)
                        || (this.state.questionIndex === numQuestions - 1 && this.state.selectedAnswer === null) ? 
                        <button 
                            className="next-btn-left" 
                            onClick={() => this.setState({ questionIndex: this.state.questionIndex - 1,
                            selectedAnswer: null})}> {/* TODO: update with DB value */}    
                                <>
                                    <div className="nav-text">
                                        <img  src="images/arrow-left/icon-arrow-left.svg" alt=""/>
                                        <span className="nav-space"> </span>
                                        Prev
                                    </div>
                                </>
                        </button>
                        :
                        <></>
                    }

                    {this.state.questionIndex < numQuestions - 1 ?
                        <button 
                            className={`next-btn-right${this.state.selectedAnswer === null ? "-disabled" : ""}`} 
                            disabled={this.state.selectedAnswer === null}
                            onClick={() => {this.onClickNextButton(this.state.questionIndex, this.state.selectedAnswer);
                            this.setState({ questionIndex: this.state.questionIndex + 1, selectedAnswer: null}); 
                            } }> {/* TODO: update with DB value */}  
                            <>
                                <div className="nav-text">
                                    Next
                                    <span className="nav-space"> </span>
                                    <img  src="images/arrow-right/icon-arrow-right.svg" alt=""/>
                                </div>
                            </>
                        </button> 
                        :
                        <></>
                    } 

                    {this.state.selectedAnswer != null && this.state.questionIndex === numQuestions - 1 ?   
                            <button className="finish-btn" onClick={() => {this.onClickMatchesButton(); 
                                this.onClickNextButton(this.state.questionIndex, this.state.selectedAnswer)}}> 
                                <span className="aLink">Finish & Match Me!</span>
                            </button>
                            :
                            <></>
                    }
                </div>
            </>
            
        );
    } 
}

const mapStateToProps = (state) => {
    return {
      email: state.email,
    };
};

export default connect(mapStateToProps)(Survey);
