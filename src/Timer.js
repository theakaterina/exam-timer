import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

/*Timer has minutes as input */
const Timer = (props) => {
  /*Start by converting minutes to seconds */
  const [seconds, setSeconds] = useState(Number(props.minutes) * 60);

  /*Using total seconds, find the hours, minutes and seconds left */
  const calculateTime = (totalSeconds) => {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = String(Math.floor(totalMinutes / 60));
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    const secondsLeft = String(totalSeconds % 60).padStart(2, "0");

    const time = `${hours}h ${minutes}m ${secondsLeft}s`;
    return time;
  };

  /*Pause button */
  const [isActive, setIsActive] = useState(false);
  function toggle() {
    setIsActive(!isActive);
  }

  /*Restart button */
  function restart() {
    setSeconds(Number(props.minutes) * 60);
  }

  /*Back button */
  const history = useHistory();
  function back() {
    history.goBack();
  }

  /*setInterval lets you call a function every n milliseconds */
  /*Every time you setInterval, it autoincrements the intervalID */
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    if (!isActive && intervalId) {
      clearInterval(intervalId);
    } else if (isActive) {
      setIntervalId(
        setInterval(() => {
          setSeconds((seconds) => seconds - 1);
        }, 1000)
      );
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  return (
    <div>
      <h1>{props.title}</h1>
      <div className="time">{calculateTime(seconds)}</div>
      <button onClick={toggle}>{isActive ? "Pause" : "Start"}</button>
      <button onClick={restart}>Restart</button>
      <button onClick={back}>Back</button>
      <button>Full Screen</button>
      <p>{props.message}</p>
    </div>
  );
};

export default Timer;
