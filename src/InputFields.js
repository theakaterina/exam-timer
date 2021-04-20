import React, { useEffect, useState } from "react";

/**
 * Create the input fields for perusal/planning, exam and a message
 * Goes inside the TimerForm
 * @param {*} props
 */

const classes = (c) => c.filter(Boolean).join(" ");

const InputFields = (props) => {
  const [perusalInput, setPerusalInput] = useState(props.perusal || "");
  const [examInput, setExamInput] = useState(props.exam || "");
  const [readingType, setReadingType] = useState(props.readingType || "none");
  const [messageInput, setMessageInput] = useState(props.message || "");

  const getFormData = () => ({
    readingType: readingType,
    perusal: Number(perusalInput),
    exam: Number(examInput),
    message: messageInput,
  });

  const onPerusalChange = (e) => {
    setPerusalInput(e.target.value);
  };

  const onExamChange = (e) => {
    setExamInput(e.target.value);
  };

  const onReadingTypeChange = (e) => {
    setReadingType(e.target.value);
  };

  const onMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  useEffect(() => {
    props.onChange(getFormData());
  }, [readingType, perusalInput, examInput, messageInput]);

  return (
    <div>
      <div>
        <select value={readingType} onChange={onReadingTypeChange}>
          <option value="perusal">Perusal Time</option>
          <option value="planning">Planning Time</option>
          <option value="none">None</option>
        </select>
        <input
          disabled={readingType === "none"}
          type="number"
          value={perusalInput}
          onChange={onPerusalChange}
        />
        <span
          className={classes([
            "mins",
            readingType === "none" && "disable-text",
          ])}
        >
          minutes
        </span>
      </div>

      <div>
        <label>Exam Time</label>
        <input type="number" value={examInput} onChange={onExamChange} />
        <span className="mins">minutes</span>
      </div>
      <div>
        <label>Text Displayed (optional)</label>
        <input
          type="text"
          name="message"
          value={messageInput}
          onChange={onMessageChange}
          placeholder="e.g. Chemistry"
        />
      </div>
    </div>
  );
};

export default InputFields;
