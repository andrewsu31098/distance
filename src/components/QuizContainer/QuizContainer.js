import "./QuizContainer.css";
import StartScreen from "../StartScreen/StartScreen";
import PlayScreen from "../PlayScreen/PlayScreen";
import GameOverScreen from "../GameOverScreen/GameOverScreen";

import { useState, useEffect } from "react";

const START = 11;
const READY = 22;
const PLAY = 33;
const OVER = 44;

function QuizContainer(props) {
  const [screenState, setScreen] = useState(START);
  const [userZIP, setZIP] = useState("");
  const [userAnswer, setAnswer] = useState("");
  const [userLives, setLives] = useState(3);
  const [userScore, setScore] = useState(0);

  function onStartClick(event) {
    setScreen(READY);
  }
  function onZIPSubmit(event) {
    event.preventDefault();
    setScreen(PLAY);
    alert(userZIP);
  }
  function onZIPChange(event) {
    setZIP(event.target.value);
    console.log(userZIP);
  }

  function onAnswerChange(event) {
    console.log(event.target.value);
    setAnswer(event.target.value);
  }
  function onAnswerSubmit(event) {
    event.preventDefault();
    setScore(userScore + 20);
    setLives(Math.max(0, userLives - 1));
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
            onAnswerSubmit={onAnswerSubmit}
            userLives={userLives}
            userScore={userScore}
            screenState={screenState}
          />
        );
      case OVER:
        return (
          <PlayScreen
            onAnswerChange={onAnswerChange}
            onAnswerSubmit={onAnswerSubmit}
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
