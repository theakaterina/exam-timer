import React, { useEffect, useState } from "react";

/**
 * Create a new timer with hours, minutes and seconds
 * Listens for pause/start and reset
 * @param {string} props.minutes
 * @returns time left
 */

/*Timer has minutes as input*/
const Timer = (props) => {
  /*Start by converting minutes to seconds */
  const [globalSeconds, setSeconds] = useState(Number(props.minutes) * 60);
  const [isActive, setIsActive] = useState(true);
  const [intervalId, setIntervalId] = useState();

  /*Using total seconds, find the hours, minutes and seconds left*/
  const calculateTime = (seconds) => {
    const totalMinutes = Math.floor(seconds / 60);
    const hours = String(Math.floor(totalMinutes / 60));
    const minutes = String(totalMinutes % 60).padStart(2, "0");
    const localSeconds = String(seconds % 60).padStart(2, "0");

    return [hours, minutes, localSeconds];
  };

  /*Pause timer*/
  function toggle() {
    setIsActive(!isActive);
  }

  /*Restart timer*/
  function restart() {
    setSeconds(Number(props.minutes) * 60);
  }

  /*While active, every second, decrease the number of seconds by 1*/
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
  }, [isActive, globalSeconds]);

  /*Listen for the pause/start and restart buttons*/
  useEffect(() => {
    window.addEventListener("toggleTimer", toggle);
    window.addEventListener("restartTimer", restart);
    return () => {
      window.removeEventListener("toggleTimer", toggle);
      window.removeEventListener("restartTimer", restart);
    };
  }, []);

  /*Once the timer reaches 0, turn off*/
  useEffect(() => {
    if (globalSeconds <= 0) {
      setIsActive(false);
      /*Have to wait until setIsActive has actually run*/
      props.onEnd && setTimeout(props.onEnd, 1);
    }
  }, [globalSeconds]);

  const time = calculateTime(globalSeconds);

  return (
    <div className="timer">
      {time[0]}
      <span className="unit">h</span>
      {time[1]}
      <span className="unit">m</span>
      {time[2]}
      <span className="unit">s</span>
    </div>
  );
};

export default Timer;
