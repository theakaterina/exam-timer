import "./App.css";
import { useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import TimerForm from "./TimerForm";
import TimerScreen from "./TimerScreen";

function App() {
  const history = useHistory();

  const onTimerFormSubmit = (e) => {
    console.log({ ...e });
    // if (e.reading === "none") {
    //   history.push("/exam");
    // } else {
    //   history.push("/perusal");
    // }
  };

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <TimerForm onSubmit={onTimerFormSubmit} />
        </Route>
        <Route path="/examstart">
          <TimerScreen />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
