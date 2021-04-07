import React, { useState } from "react";
import TimerInput from "./TimerInput";

/*Form for inputting perusal time, exam time and an optional message*/
const InputForm = (props) => {
  const handleFinalSubmit = (e) => {
    /*Submit exam details in a dictionary*/
    // props.onSubmit({
    //   reading: Number(perusalInput) === 0 ? "none" : readingType,
    //   perusal: Number(perusalInput),
    //   exam: Number(examInput),
    //   message: messageInput,
    // });
    /*On submit, prevent going to a new page*/
    e.preventDefault();
    return false;
  };

  return (
    <div>
      <form onSubmit={handleFinalSubmit}>
        <TimerInput />
        <button>Add exam</button>
        <button type="submit">START</button>
      </form>
    </div>
  );
};

export default InputForm;
