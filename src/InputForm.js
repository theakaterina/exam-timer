import React, { useState } from "react";
import TimeInput from "./TimeInput";

/*Form for inputting perusal time, exam time and an optional message*/
const InputForm = (props) => {
  /*Time defaults to 0 for both perusal and exam*/
  /*This is called a State Hook in React*/
  const [perusalInput, setPerusalInput] = useState("0");
  const [examInput, setExamInput] = useState("0");

  /*Message defaults to an empty string*/
  const [messageInput, setMessageInput] = useState("");

  /*These functions change the times and message*/
  const handlePerusalTimeChange = (newValue) => {
    setPerusalInput(newValue);
  };

  const handleExamTimeChange = (newValue) => {
    setExamInput(newValue);
  };

  const handleMessageChange = (newValue) => {
    setMessageInput(newValue);
  };

  /*On submit, prevent going to a new page*/
  const handleFinalSubmit = (e) => {
    props.onSubmit({
      perusal: Number(perusalInput),
      exam: Number(examInput),
      message: messageInput,
    });
    e.preventDefault();
    return false;
  };

  return (
    <div>
      <form onSubmit={handleFinalSubmit}>
        <label>Perusal Time: </label>
        <TimeInput onChange={handlePerusalTimeChange} />

        <label>Exam Time: </label>
        <TimeInput onChange={handleExamTimeChange} />

        <label>Optional Message: </label>
        <input
          type="text"
          name="message"
          placeholder="e.g. Chemistry"
          onChange={handleMessageChange}
        />

        <button type="submit">START</button>
      </form>
    </div>
  );
};

export default InputForm;
