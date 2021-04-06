import "./App.css";
import { useState } from "react";

import InputForm from "./InputForm";
import TimerScreen from "./TimerScreen";

function App() {
  const [screen, setScreen] = useState("input");
  const [examDetails, setExamDetails] = useState();
  const onInputFormSubmit = (e) => {
    setExamDetails(e);
    if (e.perusal === 0) {
      setScreen("exam");
    } else {
      setScreen("perusal");
    }
  };

  return (
    <div>
      {screen === "input" && <InputForm onSubmit={onInputFormSubmit} />}
      {screen === "perusal" && (
        <TimerScreen title="Perusal Time Left" minutes={examDetails.perusal} />
      )}
      {screen === "exam" && (
        <TimerScreen title="Exam Time Left" minutes={examDetails.exam} />
      )}
    </div>
  );
}

export default App;
