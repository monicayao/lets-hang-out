import React, { Component } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";

import firebase, { auth, provider } from "./backend/Firebase";
import { setAuthentication } from "./backend/actions/authentication";

import "./style/App.css";

import Wrapper from "./components/Wrapper/Wrapper";
import Header from "./components/Wrapper/Header";
import MyProfile from "./components/Profile/MyProfile";
import MatchProfile from "./components/Profile/MatchProfile";
import MatchList from "./components/Matches/Matches";
import PreviousMatches from './components/PreviousMatches/PreviousMatches'
import Survey from './components/Survey/Survey';
import ViewEditSurvey from "./components/Survey/ViewEditSurvey";

const db = firebase.firestore();
const NUM_MATCHES = 3;

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      photoUrl: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  // componentDidMount() {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({ user });
  //     }
  //   });
  // }

  login() {
    auth.signInWithPopup(provider).then((result) => {
      const { dispatch } = this.props;
      const user = result.user;
      dispatch(setAuthentication({ email: user.email }));
      this.setState({
        email: user.email,
        photoUrl: user.photoUrl
      });
      console.log("Redux has saved email: " + this.props.email) // email should be a part of prop now!! :)
      db.collection("User").doc(user.email).set({
        id: user.email
      }, {merge: true})
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null,
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Wrapper userEmail={this.props.email}>
          <>
            {this.props.email ? (
              <>
                <Header userEmail={this.props.email} />
                <BrowserRouter history={createBrowserHistory()}>
                  <div>
                    <div className="page-body">
                      <Switch>
                        <Route exact path="/" render={(props) => (<MyProfile userEmail={this.props.email} num_matches={NUM_MATCHES} />)} />
                        <Route exact path="/survey" component={withRouter(Survey)} />
                        <Route exact path="/viewsurvey" component={withRouter(ViewEditSurvey)} />
                        <Route exact path="/matches" render={(props) => (<MatchList userEmail={this.props.email} num_matches={NUM_MATCHES}/>)} />
                        <Route exact path="/savedmatches" render={(props) => (<PreviousMatches userEmail={this.props.email}/>)} />
                        <Route path="/:userId" component={withRouter(MatchProfile)} />
                      </Switch>
                    </div>
                  </div>
                </BrowserRouter>
              </>
            ) : (
              <div className="wrapper">
                <div className="login-button">
                  <Row style={{ marginTop: "80px" }}>
                    <Col>
                      <img src="images/logo/logo.svg" className="logo-sign-in" alt=""/>
                      <br/>
                      <p className="phrase-sign-in">Answer a few questions and meet a new hangout buddy from Zillow!</p>
                      <button className="button-sign-in" onClick={this.login}>Sign in with your Zillow Email</button>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </>
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
  };
};

export default connect(mapStateToProps)(App);
