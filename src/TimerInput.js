import React, { useState } from "react";

/**
 * Create the input fields for perusal/planning, exam and a message
 * Goes inside the TimerForm
 * @param {*} props
 * @returns
 */
const TimerInput = (props) => {
  /*Time defaults to 0 for both perusal/planning and exam*/
  /*This is called a State Hook in React*/
  // const [perusalInput, setPerusalInput] = useState("0");
  // const [examInput, setExamInput] = useState("0");
  const [readingType, setReadingType] = useState("Perusal");

  /*Message defaults to an empty string*/
  // const [messageInput, setMessageInput] = useState("");

  return (
    <div>
      <select onChange={(e) => setReadingType(e.target.value)}>
        <option value="Perusal">Perusal Time: </option>
        <option value="Planning">Planning Time: </option>
        <option value="none">None</option>
      </select>
      {readingType !== "none" && (
        <input type="number" placeholder="time in minutes" />
      )}
      <label>Exam Time: </label>
      <input type="number" placeholder="time in minutes" />
      <label>Optional Text: </label>
      <input type="text" name="message" placeholder="e.g. Chemistry Exam" />
    </div>
  );
};

export default TimerInput;
