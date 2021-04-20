import React, { useState } from "react";
import InputFields from "./InputFields";

/** Form for adding a timer - can add multiple timers (max 4) by adding more InputFields
 * @param {*} props
 */
const TimerForm = (props) => {
  const [formData, setFormData] = useState([
    {
      message: "",
      readingType: "perusal",
    },
  ]);

  const addFields = () => {
    setFormData([
      ...formData,
      {
        message: "",
        readingType: "perusal",
      },
    ]);
  };

  const onFormChange = (index, data) => {
    const newData = [...formData];
    newData[index] = data;
    setFormData(newData);
  };

  const onSubmit = () => {
    props.onSubmit(formData);
  };

  return (
    <div>
      {formData.map((form, index) => (
        <div key={index}>
          <h3>Exam {index + 1}</h3>
          <InputFields
            onChange={(data) => onFormChange(index, data)}
            {...form}
          />
        </div>
      ))}
      <button type="submit" onClick={onSubmit}>
        START
      </button>
      {formData.length < 4 && (
        <button onClick={addFields}>+ Add another exam</button>
      )}
    </div>
  );
};

export default TimerForm;
