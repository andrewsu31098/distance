import "./PlayScreen.css";
import { Form, Button } from "react-bootstrap";
import nycbanner from "./nycbanner.png";
import cairobanner from "../../assets/cairobanner.png";
import heart from "../../assets/heart.png";

const PLAY = 33;
const OVER = 44;

function PlayScreen(props) {
  var hearts = [];

  for (let i = 0; i < props.userLives; i++) {
    hearts.push(<img key={i} className="heartIcon" src={heart} />);
  }

  return (
    <div className="PlayScreen">
      {props.screenState === PLAY && (
        <div className="inputRow">
          <div className="inputBlock">
            <Form onSubmit={props.onAnswerSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your Guess: </Form.Label>
                <Form.Control
                  onChange={props.onAnswerChange}
                  type="text"
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
              What is the distance from you to <span>Cairo</span>?
            </div>
            <div>
              <span>Miles: </span>
              <span>?</span>
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

      <img className="bannerImg" src={cairobanner} />
    </div>
  );
}

export default PlayScreen;
