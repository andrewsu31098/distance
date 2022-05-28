import "./PlayScreen.css";
import { Form, Button } from "react-bootstrap";
import cairobanner from "../../assets/cairo.png";
import labanner from "../../assets/los angeles.png";
import heart from "../../assets/heart.png";

import { useEffect, useState } from "react";
import { API, Storage } from "aws-amplify";
import { getCity, listCitys } from "../../graphql/queries.js";
import {
  createCity as createCityMutation,
  deleteCity as deleteCityMutation,
} from "../../graphql/mutations.js";
import { ConsoleLogger } from "@aws-amplify/core";

const PLAY = 33;
const OVER = 44;

const initialFormState = { name: "" };

function PlayScreen(props) {
  const [serverAnswer, setServerAnswer] = useState("?");
  const [formData, setFormData] = useState(initialFormState);

  async function fetchCitysAll() {
    const apiData = await API.graphql({ query: listCitys });
    console.log("List of Citys object returned");
    console.log(apiData);
  }

  async function fetchCity() {
    const id = "f34e7fd6-8c3a-4197-b897-a64128fcde17";
    const apiData = await API.graphql({
      query: getCity,
      variables: { id },
    });
    await props.setCity(apiData.data.getCity);

    console.log("Fetch City");
    console.log(apiData);
    console.log("Current city");
    const fileAccessUrl = await Storage.get(`9.jpg`, {
      expires: 60,
    });
    await props.setCity({ ...props.currentCity, imgPath: fileAccessUrl });
    console.log(fileAccessUrl);
  }

  async function createCity() {
    if (!formData.name) return;
    await API.graphql({
      query: createCityMutation,
      variables: { input: formData },
    });
    setFormData(initialFormState);
    alert(formData.name);
  }

  async function deleteCity({ id }) {
    await API.graphql({
      query: deleteCityMutation,
      variables: { input: { id } },
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

  function onAnswerSubmit(e) {
    e.preventDefault();
    calldistanceAPI();
  }

  useEffect(() => {
    fetchCity();
  }, []);

  // Controls Lives for the player.
  var hearts = [];
  for (let i = 0; i < props.userLives; i++) {
    hearts.push(<img key={i} className="heartIcon" src={heart} />);
  }

  return (
    <div className="PlayScreen">
      <input
        onChange={onCityInput}
        placeholder="City name"
        value={formData.name}
      />
      <button onClick={createCity}>Create City</button>
      <button
        onClick={() => {
          fetchCitysAll();
        }}
      >
        Log database.
      </button>
      <button
        onClick={() => {
          console.log("Current City: " + props.currentCity.name);
          fetchCity();
        }}
      >
        Show Current City
      </button>
      <input type="file" onChange={onImageUpload} />

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
