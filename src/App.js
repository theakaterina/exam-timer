import "./App.css";
import { useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import TimerForm from "./TimerForm";
import TimerScreen from "./TimerScreen";

/**
 * Main app contains two routes, the input screen and the timers
 *
 */
function App() {
  const history = useHistory();
  const [timers, setTimers] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const onTimerFormSubmit = (e) => {
    setTimers(e);
    history.push("/examstart");
  };

  /*Pause/start button*/
  function toggle() {
    window.dispatchEvent(new CustomEvent("toggleTimer"));
    setIsActive((f) => !f);
  }

  /*Restart button */
  function reset() {
    if (!window.confirm("Are you sure you want to reset the timer?")) {
      return;
    }
    window.dispatchEvent(new CustomEvent("resetTimer"));
    setIsActive(false);
  }

  /*Back button */
  function goBack() {
    history.push("/");
  }

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <TimerForm onSubmit={onTimerFormSubmit} />
        </Route>
        <Route path="/examstart">
          {timers.map((timer, index) => (
            <TimerScreen key={index} {...timer} />
          ))}
          <button id="pause" onClick={toggle}>
            {isActive ? "PAUSE" : "START"}
          </button>
          <button onClick={reset}>RESET</button>
          <button onClick={goBack}>GO BACK</button>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
