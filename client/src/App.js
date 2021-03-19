import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import DashboardPage from "./views/DashboardPage/DashboardPage";
import LandingPage from "./views/LandingPage/LandingPage";
import Header from "./components/Header/Header";
import NotFound from "./views/NotFound";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <div>
      <Header location={location.pathname} />
      <Switch>
        <Route exact path="/Dashboard" component={DashboardPage} />
        <Route exact path="/Landingpage" component={LandingPage} />
        <Route exact path="/">
          <Redirect to="/Landingpage" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
