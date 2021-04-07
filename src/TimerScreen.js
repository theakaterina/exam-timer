import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import { useHistory } from "react-router-dom";

/**
 * A timerscreen contains one - many timers, and a global pause/start, reset and back button
 */

const TimerScreen = (props) => {
  /*Timers is a list of dictionaries containing all of the details for each timer*/
  const timers = props.timers;

  const history = useHistory();

  /*Go through each of the timers and create a Timer component with all the details as props*/
  let timerList = timers.map((item, index) => {
    return <Timer key={index} {...timers[index]} />;
  });

  /*Pause/start button*/
  function toggle() {
    window.dispatchEvent(new CustomEvent("toggleTimer"));
  }

  /*Restart button */
  function restart() {
    window.dispatchEvent(new CustomEvent("restartTimer"));
  }

  /*Back button */
  function goBack() {
    history.push("/");
  }

  return (
    <div>
      {timerList}
      <button onClick="toggle()">Pause</button>
      <button onClick="restart()">Restart</button>
      <button onClick="goBack()">Back</button>
    </div>
  );
};

export default TimerScreen;
