import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Containers
import Finder from "./containers/finder/finder.container";
import Result from "./containers/result/result.container";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Finder} />
        <Route path="/result" component={Result} />
      </Switch>
    </Router>
  );
}

export default App;
