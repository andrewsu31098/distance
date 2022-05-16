import "./PlayScreen.css";
import { Form, Button } from "react-bootstrap";
import cairobanner from "../../assets/cairo.png";
import labanner from "../../assets/los angeles.png";
import heart from "../../assets/heart.png";

import { useEffect, useState } from "react";
import { API } from "aws-amplify";

const PLAY = 33;
const OVER = 44;

function PlayScreen(props) {
  const [serverAnswer, setServerAnswer] = useState("?");

  async function calldistanceAPI() {
    try {
      let params = {
        queryStringParameters: {
          email: "uncleandy",
          zip: props.userZIP,
          city: props.currentCity,
        },
      };

      const resultDistance = await API.get("distanceAPI", "/distance", params);
      const cleanedResult = parseInt(resultDistance).toString();
      props.judgePlayer(props.userAnswer, cleanedResult);
      setServerAnswer(cleanedResult);
      console.log(cleanedResult);
    } catch (err) {
      console.log("This is the error:");
      console.log({ err });
    }
  }

  var hearts = [];

  for (let i = 0; i < props.userLives; i++) {
    hearts.push(<img key={i} className="heartIcon" src={heart} />);
  }

  function onFileUpload(e) {
    alert(e.target.files[0].name.replace(".png", "looneytunes"));
  }
  function onAnswerSubmit(e) {
    e.preventDefault();
    calldistanceAPI();
  }

  return (
    <div className="PlayScreen">
      {props.screenState === PLAY && (
        <div className="inputRow">
          <div className="inputBlock">
            <Form onSubmit={onAnswerSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your Guess: </Form.Label>
                <Form.Control
                  onChange={props.onAnswerChange}
                  type="number"
                  placeholder="Miles"
                />
                {/* <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Default file input example</Form.Label>
                  <Form.Control type="file" onChange={onFileUpload} />
                </Form.Group> */}
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="infoBlock">
            <div>
              What is the distance from you to <span>Cairo</span>?
            </div>
            <div>
              <span>Miles: </span>
              <span>{serverAnswer}</span>
            </div>
          </div>
          <div className="scoreBlock">
            <div>
              <p>LIVES: </p> <span>{hearts}</span>
            </div>
            <div>
              <p>
                SCORE: <span>{props.userScore}</span>{" "}
              </p>
            </div>
          </div>
        </div>
      )}
      {props.screenState === OVER && (
        <div className="inputRow">
          <div className="overBlock">
            <div>
              Game Over. <br></br>Try Again?
            </div>
            <Button
              variant="primary"
              type="button"
              onClick={props.onRetrySubmit}
            >
              Retry
            </Button>
          </div>
          <div className="scoreBlock">
            <div>
              <p>LIVES: </p> <span>{hearts}</span>
            </div>
            <div>
              <p>
                SCORE: <span>{props.userScore}</span>{" "}
              </p>
            </div>
          </div>
        </div>
      )}

      <img className="bannerImg" src={labanner} />
    </div>
  );
}

export default PlayScreen;
