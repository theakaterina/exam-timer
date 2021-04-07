import React, { useState } from "react";
import TimerInput from "./TimerInput";

/*Form for inputting perusal time, exam time and an optional message*/
const InputForm = (props) => {
  const [formData, setFormData] = useState([
    {
      perusal: 0,
      exam: 0,
      message: "",
      readingType: "perusal",
    },
  ]);

  const addForm = () => {
    setFormData([
      ...formData,
      {
        perusal: 0,
        exam: 0,
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
    console.log("submit", formData);
    props.onSubmit(formData);
  };

  return (
    <div>
      {formData.map((form, index) => (
        <TimerInput
          onChange={(data) => onFormChange(index, data)}
          key={index}
          {...form}
        />
      ))}

      <button onClick={addForm}>Add exam</button>
      <button type="submit" onClick={onSubmit}>
        START
      </button>
    </div>
  );
};

export default InputForm;
