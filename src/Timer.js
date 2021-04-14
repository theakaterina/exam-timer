import React, { useEffect, useState, useRef } from "react";

/**
 * Create a new timer with hours, minutes and seconds
 * Listens for pause/start and reset
 * @param {string} props.minutes
 */

/*Timer has minutes as input*/
const Timer = (props) => {
  /*Start by converting minutes to seconds */
  const [globalSeconds, setSeconds] = useState(Number(props.minutes) * 60);
  const [isActive, setIsActive] = useState(true);
  const [intervalId, setIntervalId] = useState();
  const isMounted = useRef(true);

  /*Using total seconds, find the hours, minutes and seconds left*/
  const calculateTime = (seconds) => {
    const totalMinutes = Math.floor(seconds / 60);
    const hours = String(Math.floor(totalMinutes / 60));
    const minutes =
      hours === "0"
        ? String(totalMinutes % 60)
        : String(totalMinutes % 60).padStart(2, "0");
    const localSeconds =
      seconds < 60
        ? String(seconds % 60)
        : String(seconds % 60).padStart(2, "0");
    return [hours, minutes, localSeconds];
  };

  /*Pause timer*/
  function toggle() {
    setIsActive((f) => !f);
  }

  /*Restart timer*/
  function restart() {
    setIsActive(false);
    setSeconds(Number(props.minutes) * 60);
  }

  /*While active, every second, decrease the number of seconds by 1*/
  useEffect(() => {
    /*isMounted is necessary to stop memory leaks when the first timer hits 0*/
    isMounted.current = true;
    if (!isActive && intervalId) {
      clearTimeout(intervalId);
    } else if (isActive) {
      setIntervalId(
        setTimeout(() => {
          if (isMounted.current) {
            setSeconds((s) => s - 1);
          }
        }, 1000)
      );
    }
    return () => {
      clearTimeout(intervalId);
      isMounted.current = false;
    };
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
      props.onEnd();
    }
  }, [globalSeconds]);

  const time = calculateTime(globalSeconds);

  /*Only display the hours and minutes if there are hours and minutes left*/
  return (
    <div className="timer">
      {time[0] === "0" ? "" : time[0]}
      <span className="unit">{time[0] === "0" ? "" : "h "}</span>
      {time[0] === "0" && time[1] == "0" ? "" : time[1]}
      <span className="unit">
        {time[0] === "0" && time[1] == "0" ? "" : "m "}
      </span>
      {time[2]}
      <span className="unit">s</span>
    </div>
  );
};

export default Timer;
