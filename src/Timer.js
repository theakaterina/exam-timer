import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

/*Timer has minutes as input */
const Timer = (props) => {
  /*Start by converting minutes to seconds */
  const [seconds, setSeconds] = useState(Number(props.minutes) * 60);
  const [isActive, setIsActive] = useState(true);
  const [intervalId, setIntervalId] = useState();
  const history = useHistory();

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
  function toggle() {
    setIsActive(!isActive);
  }

  /*Restart button */
  function restart() {
    setSeconds(Number(props.minutes) * 60);
  }

  /*Back button */
  function back() {
    history.push("/");
  }

  useEffect(() => {
    if (!isActive && intervalId) {
      clearTimeout(intervalId);
    } else if (isActive) {
      setIntervalId(
        setTimeout(() => {
          setSeconds((s) => s - 1);
        }, 1000)
      );
    }

    return () => clearTimeout(intervalId);
  }, [isActive, seconds]);

  useEffect(() => {
    console.log("useffect", seconds);
    if (seconds <= 0) {
      console.log("Done timer!");
      setIsActive(false);
      history.push("/exam");
    }
  }, [seconds]);

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
