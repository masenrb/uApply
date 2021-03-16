import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DashboardPage from "./views/DashboardPage/DashboardPage";
import LandingPage from "./views/LandingPage/LandingPage";
import NotFound from "./views/NotFound";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Dashboard" component={DashboardPage} />
        <Route exact path="/Landingpage" component={LandingPage} />
        <Route exact path="/">
          <Redirect to="/Dashboard" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
