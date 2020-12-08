import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostComponent from "./posts/PostComponent";
import "./App.css";
import Posts from "./posts/Posts";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/post" component={PostComponent} />
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
