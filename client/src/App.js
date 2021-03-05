import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DashboardPage from "./views/DashboardPage/DashboardPage";
import NotFound from "./views/NotFound";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/Dashboard" component={DashboardPage} />
        <Route exact path="/">
          <Redirect to="/Dashboard" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
