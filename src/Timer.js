import React, { useEffect, useState } from "react";

/**
 * Create a new timer with hours, minutes and seconds and a custom message
 * Listens for pause/start and reset
 * @param {string} props.minutes
 * @param {string} props.message
 * @returns time left + message
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

    const time = `${hours}:${minutes}:${localSeconds}`;
    return time;
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

  /*Listen for the pause/start button*/
  useEffect(() => {
    window.addEventListener("toggleTimer", toggle);
    return () => window.removeEventListener("toggleTimer", toggle);
  }, []);

  /*Listen for the restart button*/
  useEffect(() => {
    window.addEventListener("restartTimer", restart);
    return () => window.removeEventListener("restartTimer", restart);
  }, []);

  let time = calculateTime(globalSeconds).split(":");

  return (
    <div>
      <div class="countdown">
        {time[0]}
        <div class="unit">h</div>
        {time[1]}
        <div class="unit">m</div>
        {time[2]}
        <div class="unit">s</div>
      </div>
      <p class="message">{props.message}</p>
    </div>
  );
};

export default Timer;
