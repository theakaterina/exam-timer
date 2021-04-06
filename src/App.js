import "./App.css";
import { useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import InputForm from "./InputForm";
import Timer from "./Timer";

function App() {
  const [examDetails, setExamDetails] = useState({ reading: "none", exam: 0 });
  const history = useHistory();

  const onInputFormSubmit = (e) => {
    setExamDetails(e);
    if (e.reading === "none") {
      history.push("/exam");
    } else {
      history.push("/perusal");
    }
  };

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <InputForm onSubmit={onInputFormSubmit} />
        </Route>
        <Route path="/perusal">
          <Timer
            title={examDetails.reading + " Time Left"}
            minutes={examDetails.perusal}
            message={examDetails.message}
          />
        </Route>
        <Route path="/exam">
          <Timer
            title="Exam Time Left"
            minutes={examDetails.exam}
            message={examDetails.message}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
