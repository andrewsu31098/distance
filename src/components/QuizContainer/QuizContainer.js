import "./QuizContainer.css";
import StartScreen from "../StartScreen/StartScreen";
import PlayScreen from "../PlayScreen/PlayScreen";

import { useState, useEffect } from "react";

const START = 11;
const READY = 22;
const PLAY = 33;
const OVER = 44;

function scoreAnswer(guess, answer) {
  let guessInt = parseInt(guess);
  let answerInt = parseInt(answer);
  let score =
    100 - 100 * Math.min(1, Math.abs(answerInt - guessInt) / answerInt);
  return parseInt(score);
}

function QuizContainer(props) {
  // screenState keeps track of 1 of 4 screens. Start. Ready. Play. Over.
  const [screenState, setScreen] = useState(START);
  const [userZIP, setZIP] = useState("");
  const [userAnswer, setAnswer] = useState("");
  const [userLives, setLives] = useState(3);
  const [userScore, setScore] = useState(0);
  const [currentCity, setCity] = useState({ name: "nocity" });

  const [validated, setValidated] = useState(false);

  function judgePlayer(guess, answer) {
    let score = scoreAnswer(guess, answer);
    setScore(userScore + score);
    if (score <= 75) {
      setLives(userLives - 1);
    }
  }

  function onStartClick(event) {
    setScreen(READY);
  }

  function onZIPSubmit(event) {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setScreen(PLAY);
    }
    setValidated(true);
  }
  function onZIPChange(event) {
    setZIP(event.target.value);
  }

  function onAnswerChange(event) {
    console.log(event.target.value);
    setAnswer(event.target.value);
  }

  function onRetrySubmit(event) {
    setLives(3);
    setScore(0);
    setScreen(PLAY);
  }

  useEffect(() => {
    if (userLives <= 0) {
      setScreen(OVER);
    }
  });

  function screenSwitch() {
    switch (screenState) {
      case START:
        return (
          <StartScreen
            onStartClick={onStartClick}
            onZIPSubmit={onZIPSubmit}
            onZIPChange={onZIPChange}
            userZIP={userZIP}
            screenState={screenState}
            validated={validated}
          />
        );
      case READY:
        return (
          <StartScreen
            onStartClick={onStartClick}
            onZIPSubmit={onZIPSubmit}
            onZIPChange={onZIPChange}
            userZIP={userZIP}
            screenState={screenState}
            validated={validated}
          />
        );
      case PLAY:
        return (
          <PlayScreen
            onAnswerChange={onAnswerChange}
            userLives={userLives}
            userScore={userScore}
            userAnswer={userAnswer}
            userZIP={userZIP}
            currentCity={currentCity}
            setCity={setCity}
            screenState={screenState}
            judgePlayer={judgePlayer}
          />
        );
      case OVER:
        return (
          <PlayScreen
            onAnswerChange={onAnswerChange}
            userLives={userLives}
            userScore={userScore}
            userAnswer={userAnswer}
            userZIP={userZIP}
            currentCity={currentCity}
            setCity={setCity}
            screenState={screenState}
            judgePlayer={judgePlayer}
            onRetrySubmit={onRetrySubmit}
          />
        );
      default:
        throw Error("Screen not returned valid code");
    }
  }
  return (
    <div className="QuizContainer">
      <div className="QuizWindow">{screenSwitch()}</div>
    </div>
  );
}

export default QuizContainer;
