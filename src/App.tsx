import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Story from "./posts/Story";
import "./App.css";
import Posts from "./posts/Stories";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/post" component={Story} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
