import React from "react";
import "../index.css";
import { Row, Col, Image, Button } from "react-bootstrap";
import "../index.css";
import { connect } from "react-redux";
import Header from "./Wrapper/Header";

class MatchedProfile extends React.Component {

  componentDidMount() {
    console.log("In matchedProfile");
    console.log(this.props.authentication);
  }

  onClickBack = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <Header />
        <div className="matched_profile_rectangle">
          <Row style={{ margin: "0 0", padding: "0 0" }}>
            <Col xs={3} className="profile-text-align">
              <Row>
                <Col
                  className="profile_question"
                  onClick={this.onClickBack}
                  style={{
                    color: "#3857e0",
                    marginTop: "20px",
                    fontSize: "10px",
                    padding: "0 20px",
                  }}
                >
                  <Image
                    src="images/arrow-left/icon-arrow-left.svg"
                    className="profile_avatar_image"
                    style={{
                      width: "15px",
                      height: "10px",
                      paddingRight: "5px",
                    }}
                    roundedCircle
                  />
                  <p>Back to my matches</p>
                </Col>
              </Row>
              <div className="profile_avatar_wrapper">
                <Image
                  src="images/match-profile.png"
                  className="profile_avatar_image"
                  roundedCircle
                />
              </div>
              <div className="profile-basic-info-wrapper">
                <Row>
                  <Col className="profile_name" style={{ fontWeight: "bold" }}>
                    Frank Matthews
                  </Col>
                </Row>
                <Row>
                  <Col className="profile_small_text">Software Engineer</Col>
                </Row>
                <Row style={{ marginTop: "30px" }}>
                  <Col
                    xs={12}
                    className="profile_small_text"
                    style={{ fontWeight: "bold" }}
                  >
                    Started
                  </Col>
                  <Col xs={12} className="profile_small_text">
                    Feb 13, 2012
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={12}
                    className="profile_small_text"
                    style={{ fontWeight: "bold" }}
                  >
                    Location
                  </Col>
                  <Col xs={12} className="profile_small_text">
                    Irvine
                  </Col>
                </Row>
              </div>
            </Col>

            <Col
              xs={9}
              style={{
                borderLeft: "1px solid lightblue",
                height: "100%",
              }}
            >
              <Row>
                <Col className="profile-about-me">About me</Col>
              </Row>
              <Row>
                <Col xs={8}>
                  <Row className="profile-item-wrapper">
                    <Col xs={12} className="profile-about-me-keyword">
                      What I do?
                    </Col>
                    <Col xs={12} className="profile-about-me-content">
                      Develop web tools for pros of all kinds
                    </Col>
                  </Row>

                  <Row className="profile-item-wrapper">
                    <Col xs={12} className="profile-about-me-keyword">
                      Words of Wisdom
                    </Col>
                    <Col xs={12} className="profile-about-me-content">
                      Don't be afraid of the unknown
                    </Col>
                  </Row>

                  <Row className="profile-item-wrapper">
                    <Col xs={12} className="profile-about-me-keyword">
                      My Teams
                    </Col>
                    <Col xs={12} className="profile-about-me-content">
                      New Construction
                    </Col>
                  </Row>

                  <Row className="profile-item-wrapper">
                    <Col xs={12} className="profile-about-me-keyword">
                      Contact
                    </Col>
                    <Col xs={12} className="profile-about-me-content">
                      frankm@zillowgroup.com
                    </Col>
                    <Col xs={12} className="profile-about-me-content">
                      <b>Q:</b> +1 (949)398-1784
                    </Col>
                    <Col xs={12} className="profile-about-me-content">
                      <b>M:</b> +1 (310)488-2888
                    </Col>
                  </Row>
                </Col>
                <Col xs={4}>
                  <Button
                    className="profile_match_button"
                    style={{ fontSize: "14px", padding: "8px 10px" }}
                  >
                    Chat on Slack
                  </Button>
                </Col>
              </Row>

              <Row>
                <div className="horizontal-line"></div>
              </Row>

              <Row>
                <Col>
                  <Row>
                    <Col xs={10} className="profile-my-matches">
                      How about a game together?
                    </Col>
                  </Row>
                  <Row className="profile-item-wrapper">
                    <Col
                      xs={12}
                      className="profile-question"
                      style={{ color: "#3857e0" }}
                    >
                      Pictionary
                    </Col>
                  </Row>
                  <Row className="profile-item-wrapper">
                    <Col
                      xs={12}
                      className="profile-question"
                      style={{ color: "#3857e0" }}
                    >
                      Do you know me?
                    </Col>
                  </Row>
                  <Row className="profile-item-wrapper">
                    <Col
                      xs={12}
                      className="profile-question"
                      style={{ color: "#3857e0" }}
                    >
                      Clue
                    </Col>
                  </Row>
                  <Row className="profile-item-wrapper">
                    <Col
                      xs={12}
                      className="profile-question"
                      style={{ color: "#3857e0" }}
                    >
                      Bluebeard's Bride
                    </Col>
                  </Row>
                  <Row className="profile-item-wrapper">
                    <Col
                      xs={12}
                      className="profile-question"
                      style={{ color: "#3857e0", marginBottom: "45px" }}
                    >
                      Dungeons & Dragons Player's Handbook
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  };
};

export default connect(mapStateToProps)(MatchedProfile);
