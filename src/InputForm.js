import React, { useState } from "react";
import TimeInput from "./TimeInput";

/*Form for inputting perusal time, exam time and an optional message*/
const InputForm = (props) => {
  /*Time defaults to 0 for both perusal/planning and exam*/
  /*This is called a State Hook in React*/
  const [perusalInput, setPerusalInput] = useState("0");
  const [examInput, setExamInput] = useState("0");
  const [readingType, setReadingType] = useState("Perusal");

  /*Message defaults to an empty string*/
  const [messageInput, setMessageInput] = useState("");

  const handleFinalSubmit = (e) => {
    /*Submit exam details in a dictionary*/
    props.onSubmit({
      reading: Number(perusalInput) === 0 ? "none" : readingType,
      perusal: Number(perusalInput),
      exam: Number(examInput),
      message: messageInput,
    });
    /*On submit, prevent going to a new page*/
    e.preventDefault();
    return false;
  };

  return (
    <div>
      <form onSubmit={handleFinalSubmit}>
        <select onChange={(e) => setReadingType(e.target.value)}>
          <option value="Perusal">Perusal Time: </option>
          <option value="Planning">Planning Time: </option>
          <option value="none">None</option>
        </select>

        {readingType !== "none" && (
          <TimeInput onChange={(newValue) => setPerusalInput(newValue)} />
        )}

        <label>Exam Time: </label>
        <TimeInput onChange={(newValue) => setExamInput(newValue)} />

        <label>Optional Message: </label>
        <input
          type="text"
          name="message"
          placeholder="e.g. Chemistry"
          onChange={(e) => setMessageInput(e.target.value)}
        />

        <button type="submit">START</button>
      </form>
    </div>
  );
};

export default InputForm;
