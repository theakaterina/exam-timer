import React, { useEffect, useState, useRef } from "react";

/**
 * Create a new timer with hours, minutes and seconds
 * Listens for pause/start and reset
 * @param {string} props.minutes
 */

/* Timer has minutes as input*/
const Timer = (props) => {
  const [isActive, setIsActive] = useState(true);
  const [intervalId, setIntervalId] = useState();
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  /* Convert minutes to milliseconds */
  const finishTime = Number(props.minutes) * 60 * 1000;

  /* Using milliseconds left, find the hours, minutes and seconds left */
  const calculateTime = (ms) => {
    const seconds = ms / 1000;
    const minutes = Math.floor(seconds / 60);
    const displayHours = String(Math.floor(minutes / 60));
    const displayMinutes =
      displayHours === "0"
        ? String(minutes % 60)
        : String(minutes % 60).padStart(2, "0");
    const displaySeconds =
      seconds < 60
        ? String(Math.floor(seconds % 60))
        : String(Math.floor(seconds % 60)).padStart(2, "0");
    return [displayHours, displayMinutes, displaySeconds];
  };

  /* Pause timer */
  function toggle() {
    setIsActive((f) => !f);
  }

  /* Restart timer */
  function reset() {
    setIsActive(false);
    setElapsedTime(0);
  }

  /* setInterval and setTimeout are not accurate - they can be off by several
     milliseconds, so we need to keep track of time using Date.now().
   */
  const updateElapsedTime = () => {
    const now = Date.now();
    const timeSinceLastTick = now - startTime;
    setElapsedTime((s) => s + timeSinceLastTick);
    setStartTime((s) => now);
  }

  /* If it's paused, keep updating elapsedTime, when it gets unpaused set the
     startTime to current time
  */
  useEffect(() => {
    if (!isActive) {
      updateElapsedTime();
    } else {
      setStartTime(Date.now());
    }
  }, [isActive]);

  /* Mostly react stuff that I don't really understand...
     Updates the elapsedTime and startTime roughly very 500ms
  */
  useEffect(() => {
    if (!isActive && intervalId) {
      clearTimeout(intervalId);
      setIntervalId(null);
    } else if (isActive) {
      if (intervalId) {
        clearTimeout(intervalId);
        setIntervalId(null);
      }
      setIntervalId(setTimeout(() => {
        updateElapsedTime();
      }, 500));
    }
    return () => {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isActive, startTime]);

  /* Listen for the pause/start and restart buttons */
  useEffect(() => {
    window.addEventListener("toggleTimer", toggle);
    window.addEventListener("resetTimer", reset);
    return () => {
      window.removeEventListener("toggleTimer", toggle);
      window.removeEventListener("resetTimer", reset);
    };
  }, []);

  /* Once the timer reaches 0, turn off */
  useEffect(() => {
    if (elapsedTime >= finishTime) {
      setIsActive(false);
      /* Set elapsedTime otherwise final time shown will be negative */
      setElapsedTime(finishTime);
      props.onEnd();
    }
  }, [elapsedTime]);

  /* Time left */
  const time = calculateTime(finishTime - elapsedTime);

  /* Only display the hours and minutes if there are hours and minutes left */
  return (
    <div className="timer">
      {time[0] === "0" ? "" : time[0]}
      <span className="unit">{time[0] === "0" ? "" : "h "}</span>
      {time[0] === "0" && time[1] === "0" ? "" : time[1]}
      <span className="unit">
        {time[0] === "0" && time[1] === "0" ? "" : "m "}
      </span>
      {time[2]}
      <span className="unit">s</span>
    </div>
  );
};

export default Timer;
