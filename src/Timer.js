import React, { useEffect, useState } from "react";

const Timer = (props) => {
  const [seconds, setSeconds] = useState(Number(props.minutes) * 60);

  /*Find the total hours, minutes and seconds left */
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
  }, [isActive]);

  return (
    <div className="app">
      <div className="time">{calculateTime(seconds)}</div>
      <div className="row">
        <button
          className={`button button-primary button-primary-${
            isActive ? "active" : "inactive"
          }`}
          onClick={toggle}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button>back</button>
        <button>full screen</button>
      </div>
    </div>
  );
};

export default Timer;
