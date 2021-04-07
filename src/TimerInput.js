import React, { useEffect, useState } from "react";

/**
 * Create the input fields for perusal/planning, exam and a message
 * Goes inside the TimerForm
 * @param {*} props
 * @returns
 */
const TimerInput = (props) => {
  /*Time defaults to 0 for both perusal/planning and exam*/
  /*This is called a State Hook in React*/
  const [perusalInput, setPerusalInput] = useState(props.perusal);
  const [examInput, setExamInput] = useState(props.exam);
  const [readingType, setReadingType] = useState(props.readingType);

  /*Message defaults to an empty string*/
  const [messageInput, setMessageInput] = useState(props.message);

  const getFormData = () => ({
    readingType: Number(perusalInput) === 0 ? "none" : readingType,
    perusal: Number(perusalInput),
    exam: Number(examInput),
    message: messageInput,
  });

  const onPerusalChange = (e) => {
    setPerusalInput(e.target.value);
    // props.onChange(getFormData());
  };

  const onExamChange = (e) => {
    setExamInput(e.target.value);
    // props.onChange(getFormData());
  };

  const onReadingTypeChange = (e) => {
    setReadingType(e.target.value);
    // props.onChange(getFormData());
  };

  const onMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  useEffect(() => {
    props.onChange(getFormData());
  }, [readingType, perusalInput, examInput, messageInput]);

  return (
    <div>
      <select value={readingType} onChange={onReadingTypeChange}>
        <option value="Perusal">Perusal Time: </option>
        <option value="Planning">Planning Time: </option>
        <option value="none">None</option>
      </select>
      {readingType !== "none" && (
        <input
          type="number"
          value={perusalInput}
          onChange={onPerusalChange}
          placeholder="time in minutes"
        />
      )}

      <div>
        <label>Exam Time: </label>
        <input
          type="number"
          value={examInput}
          onChange={onExamChange}
          placeholder="time in minutes"
        />
      </div>
      <div>
        <label>Optional Text: </label>
        <input
          type="text"
          name="message"
          value={messageInput}
          onChange={onMessageChange}
          placeholder="e.g. Chemistry Exam"
        />
      </div>
    </div>
  );
};

export default TimerInput;
