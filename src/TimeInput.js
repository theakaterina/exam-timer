import { useState } from "react";
import "./TimeInput.css";

const TimeInput = (props) => {
  const [value, setValue] = useState(props.value || "");

  const handleInput = (e) => {
    setValue(e.target.value);
    props.onChange(e.target.value);
  };

  return (
    <div>
      <input
        type="number"
        onChange={handleInput}
        value={value}
        placeholder="0"
      />
      m
    </div>
  );
};

export default TimeInput;
