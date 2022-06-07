import "./PlayScreen.css";
import { Form, Button } from "react-bootstrap";
import cairobanner from "../../assets/cairo.png";
import labanner from "../../assets/los angeles.png";
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
  const [serverAnswer, setServerAnswer] = useState("?");
  const [formData, setFormData] = useState(initialFormState);

  async function fetchTownsAll() {
    const apiData = await API.graphql({ query: listTowns });
    console.log("List of Towns object returned");
    console.log(apiData);
    return apiData;
  }

  async function fetchRandomTown() {
    const imageNumber = parseInt(1 + Math.random() * 9).toString();
    const apiData = await API.graphql(
      graphqlOperation(townByNumber, { imageNumber: imageNumber })
    );

    console.log("This is what im setting currentCity to.");
    console.log(apiData.data.townByNumber.items[0]);

    const cityNumber = apiData.data.townByNumber.items[0].imageNumber;
    console.log("City number: " + cityNumber);

    const fileAccessUrl = await Storage.get(`${cityNumber}.jpg`, {
      expires: 60,
    });
    await props.setCity({
      ...apiData.data.townByNumber.items[0],
      imgPath: fileAccessUrl,
    });
    console.log(fileAccessUrl);
  }

  async function createTown() {
    if (!formData.name) return;
    await API.graphql({
      query: createTownMutation,
      variables: { input: formData },
    });
    setFormData(initialFormState);
    alert(formData.name);
  }

  async function deleteTown({ id }) {
    await API.graphql({
      query: deleteTownMutation,
      variables: { input: { id } },
    });
  }

  async function deleteAllTowns() {
    const apiData = await fetchTownsAll();
    for (let i = 0; i < apiData.data.listTowns.items.length; i++) {
      await deleteTown({ id: apiData.data.listTowns.items[i].id });
    }
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
      const cleanedResult = parseInt(resultDistance).toString();
      props.judgePlayer(props.userAnswer, cleanedResult);
      setServerAnswer(cleanedResult);
      console.log(cleanedResult);
    } catch (err) {
      console.log("This is the error:");
      console.log({ err });
    }
  }

  async function onImageUpload(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
  }

  function onCityInput(e) {
    setFormData({ ...formData, name: e.target.value });
    console.log(e.target.value);
  }
  function onImageNumberInput(e) {
    setFormData({ ...formData, imageNumber: e.target.value });
    console.log(e.target.value);
  }

  function onAnswerSubmit(e) {
    e.preventDefault();
    calldistanceAPI();
  }

  useEffect(() => {
    fetchRandomTown();
  }, []);

  // Custom effect hook that will only fire on updates, not initialization.
  const notInitialRender = useRef(false);
  useEffect(() => {
    if (serverAnswer !== "?" && notInitialRender.current) {
      sleep(3000);
      fetchRandomTown();
    } else {
      notInitialRender.current = true;
    }
  }, [serverAnswer]);

  useEffect(() => {
    setServerAnswer("?");
  }, [props.currentCity]);
  // Controls Lives for the player.
  var hearts = [];
  for (let i = 0; i < props.userLives; i++) {
    hearts.push(<img key={i} className="heartIcon" src={heart} />);
  }

  return (
    <div className="PlayScreen">
      {/* <input
        onChange={onCityInput}
        placeholder="City name"
        value={formData.name}
      />
      <input
        onChange={onImageNumberInput}
        placeholder="Image Number"
        value={formData.imageNumber}
      />
      <button onClick={createTown}>Create City</button>
      <button
        onClick={() => {
          fetchTownsAll();
        }}
      >
        Log database.
      </button>
      <button
        onClick={() => {
          console.log("Current City: ");
          console.log(props.currentCity);
        }}
      >
        Show Current City
      </button>

      <button onClick={deleteAllTowns}>Delete All Cities.</button>
      <input type="file" onChange={onImageUpload} /> */}

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
      {props.currentCity.name !== "nocity" && (
        <img className="bannerImg" src={props.currentCity.imgPath} />
      )}
    </div>
  );
}

export default PlayScreen;
