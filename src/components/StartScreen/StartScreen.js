import "./StartScreen.css";
import { Form, Button } from "react-bootstrap";

const START = 11;
const READY = 22;

function StartScreen(props) {
  return (
    <div className="StartScreen">
      <div className="StartRow">
        {props.screenState === START && (
          <div className="StartButton" onClick={props.onStartClick}>
            Start{" "}
          </div>
        )}
        {props.screenState === START && (
          <div className="StartBlock">
            Guess the distance between you and other famous places in the world.
            <br></br>You get three lives and can aim for a high score.
          </div>
        )}
        {props.screenState === READY && (
          <div className="StartForm">
            <Form onSubmit={props.onZIPSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  Place the starting ZIP of where you want to guess the distance
                  from.{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ZIP Address"
                  onChange={props.onZIPChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        )}
      </div>
      <div className="ExampleRow">
        <div>
          <img src="https://i.pinimg.com/736x/e6/3d/da/e63dda8f2d323e96490f761c461b4e23.jpg" />
          <div>
            Distance from L.A to N.Y.C. <b>2,364 Miles</b>
          </div>
        </div>
        <div>
          <img src="https://i.pinimg.com/736x/96/4f/4f/964f4fdad15ac63a9431500296864a3c.jpg" />
          <div>
            Distance from L.A to London <b>5441 Miles</b>
          </div>
        </div>

        <div>
          <img src="https://i.pinimg.com/originals/dc/9e/8b/dc9e8b732648155db274936daf869149.jpg" />
          <div>
            Distance from L.A to Rome <b>6332 Miles</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
