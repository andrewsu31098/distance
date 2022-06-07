import "./PlayScreen.css";
import { Form, Button } from "react-bootstrap";
import heart from "../../assets/heart.png";

import { useRef, useEffect, useState } from "react";
import { API, Storage, graphqlOperation } from "aws-amplify";
import { getTown, townByNumber, listTowns } from "../../graphql/queries.js";
import {
  createTown as createTownMutation,
  deleteTown as deleteTownMutation,
} from "../../graphql/mutations.js";
import { ConsoleLogger } from "@aws-amplify/core";
import sleep from "../../functions/sleep.js";

const PLAY = 33;
const OVER = 44;

const initialFormState = { name: "", imageNumber: "" };

function PlayScreen(props) {
  const [serverAnswer, setServerAnswer] = useState(0);
  const processingAnswer = useRef(false);

  let answerProcessing = true;

  async function fetchTownsAll() {
    const apiData = await API.graphql({ query: listTowns });
    return apiData;
  }

  async function fetchRandomTown() {
    const imageNumber = parseInt(1 + Math.random() * 9).toString();
    const apiData = await API.graphql(
      graphqlOperation(townByNumber, { imageNumber: imageNumber })
    );

    const cityNumber = apiData.data.townByNumber.items[0].imageNumber;

    const fileAccessUrl = await Storage.get(`${cityNumber}.jpg`, {
      expires: 60,
    });
    await props.setCity({
      ...apiData.data.townByNumber.items[0],
      imgPath: fileAccessUrl,
    });
  }

  async function calldistanceAPI() {
    try {
      let params = {
        queryStringParameters: {
          email: "uncleandy",
          zip: props.userZIP,
          city: props.currentCity.name,
        },
      };

      const resultDistance = await API.get("distanceAPI", "/distance", params);
      const cleanedResult = parseInt(resultDistance);
      props.judgePlayer(props.userAnswer, cleanedResult);
      setServerAnswer(0);
      setServerAnswer(cleanedResult);
      processingAnswer.current = false;
    } catch (err) {
      console.log("This is the error:");
      console.log({ err });
    }
  }

  function onAnswerSubmit(e) {
    e.preventDefault();
    if (processingAnswer.current === false) {
      processingAnswer.current = true;
      calldistanceAPI();
    }
  }

  useEffect(() => {
    fetchRandomTown();
  }, []);

  // Custom effect hook that will only fire on updates, not initialization.
  const notInitialRender = useRef(false);
  useEffect(() => {
    if (serverAnswer !== 0 && notInitialRender.current) {
      sleep(3000);
      fetchRandomTown();
    } else {
      notInitialRender.current = true;
    }
  }, [serverAnswer]);

  useEffect(() => {
    let x = serverAnswer;
    setServerAnswer(0);
    setServerAnswer(x);
  }, [props.currentCity]);
  // Controls Lives for the player.
  var hearts = [];
  for (let i = 0; i < props.userLives; i++) {
    hearts.push(<img key={i} className="heartIcon" src={heart} />);
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
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="infoBlock">
            <div>
              What is the distance from you to{" "}
              <span>{props.currentCity.name}</span>?
            </div>
            <div>
              <span>Answer (Miles): </span>
              <span>{serverAnswer === 0 ? "?" : serverAnswer}</span>
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
      {props.currentCity.name !== "nocity" && (
        <img className="bannerImg" src={props.currentCity.imgPath} />
      )}
    </div>
  );
}

export default PlayScreen;
