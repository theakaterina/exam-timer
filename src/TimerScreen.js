import React, { useState } from "react";
import Timer from "./Timer";

/**
 * A timerscreen contains a title, timer and a message
 * @param {string} props.readingType
 * @param {Number} props.perusal
 * @param {Number} props.exam
 * @param {string} props.message
 */

const TimerScreen = (props) => {
  /*The timer mode can either be perusal or exam*/
  const [mode, setMode] = useState(
    props.readingType !== "none" ? "perusal" : "exam"
  );

  /*Set the title*/
  let title = "";
  if (mode === "perusal") {
    if (props.readingType === "perusal") {
      title = "Perusal Time Left";
    } else {
      title = "Planning Time Left";
    }
  } else {
    title = "Exam Time Left";
  }

  /*Go straight from perusal/planning time to the exam timer*/
  const onPerusalEnd = () => {
    setMode("exam");
  };

  return (
    <div>
      <h1 className="title">{title}</h1>
      <h2 className="message">{props.message}</h2>
      {mode === "perusal" && (
        <Timer key={1} onEnd={onPerusalEnd} minutes={props.perusal} />
      )}
      {mode === "exam" && <Timer key={2} minutes={props.exam} />}
    </div>
  );
};

export default TimerScreen;
