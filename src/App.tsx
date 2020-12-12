import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./home/Home";
import Story from "./posts/Story";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/:site" component={Home} />
          <Route path="/post" exact component={Story} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
