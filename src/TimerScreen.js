import React, { useState } from "react";
import Timer from "./Timer";

/**
 * A timerscreen contains one - many timers, and a global pause/start, reset and back button
 */

const TimerScreen = (props) => {
  /*Timers is a list of dictionaries containing all of the details for each timer*/
  const [mode, setMode] = useState(
    props.readingType !== "none" ? "perusal" : "exam"
  );

  const title = "title";

  const onPerusalEnd = () => {
    setMode("exam");
  };

  return (
    <div>
      <div className="title">
        {props.readingType} {mode}
      </div>
      {mode === "perusal" && (
        <Timer key={1} onEnd={onPerusalEnd} minutes={props.perusal} />
      )}
      {mode === "exam" && <Timer key={2} minutes={props.exam} />}
      <div className="message">{props.message}</div>
    </div>
  );
};

export default TimerScreen;
