import "./App.css";
import { useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import TimerForm from "./TimerForm";
import TimerScreen from "./TimerScreen";
import Timer from "./Timer";

function App() {
  const history = useHistory();
  const [timers, setTimers] = useState([]);

  const onTimerFormSubmit = (e) => {
    console.log(e);
    setTimers(e);
    history.push("/examstart");
  };
  /*Pause/start button*/

  function toggle() {
    window.dispatchEvent(new CustomEvent("toggleTimer"));
  }

  /*Restart button */
  function restart() {
    window.dispatchEvent(new CustomEvent("restartTimer"));
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
          <button>pause</button>
          <button>restart</button>
          <button>go back</button>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
