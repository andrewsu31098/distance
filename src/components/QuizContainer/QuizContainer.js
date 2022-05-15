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
  let score = 100 - (100 * Math.abs(answerInt - guessInt)) / answerInt;
  return parseInt(score);
}

function QuizContainer(props) {
  // screenState keeps track of 1 of 4 screens. Start. Ready. Play. Over.
  const [screenState, setScreen] = useState(START);
  const [userZIP, setZIP] = useState("");
  const [userAnswer, setAnswer] = useState("");
  const [userLives, setLives] = useState(3);
  const [userScore, setScore] = useState(0);
  const [currentCity, setCity] = useState("cairo");

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
    event.preventDefault();
    setScreen(PLAY);
  }
  function onZIPChange(event) {
    setZIP(event.target.value);
    console.log(userZIP);
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
            screenState={screenState}
          />
        );
      case READY:
        return (
          <StartScreen
            onStartClick={onStartClick}
            onZIPSubmit={onZIPSubmit}
            onZIPChange={onZIPChange}
            screenState={screenState}
          />
        );
      case PLAY:
        return (
          <PlayScreen
            onAnswerChange={onAnswerChange}
            userLives={userLives}
            userScore={userScore}
            userAnswer={userAnswer}
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
            screenState={screenState}
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
