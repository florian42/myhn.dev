import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostComponent from "./components/PostComponent"
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/post" component={PostComponent} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
