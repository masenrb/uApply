import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import DashboardPage from "./views/DashboardPage/DashboardPage";
import LandingPage from "./views/LandingPage/LandingPage";
import ApplicationPage from "./views/ApplicationPage/ApplicationPage";
import CreateApplicationPage from "./views/CreateApplicationPage/CreateApplicationPage";
import Header from "./components/Header/Header";
import NotFound from "./views/NotFound";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./utils/UserContext";

function App() {
  const location = useLocation();
  const user = {
    data: JSON.parse(localStorage.getItem("data")),
    isLoggedIn: localStorage.getItem("isLoggedIn"),
  };

  console.log("App");
  console.log(user);
  return (
    <div>
      <UserProvider value={user}>
        <Header location={location.pathname} />
        <Switch>
          <Route exact path="/Dashboard" component={DashboardPage} />
          <Route exact path="/Landingpage" component={LandingPage} />
          <Route exact path="/">
            <Redirect to="/Landingpage" />
          </Route>
          <Route exact path="/Application" component={ApplicationPage} />
          <Route
            exact
            path="/CreateApplication"
            component={CreateApplicationPage}
          />
          <Route exact path="/Application/:applicationId" component={ApplicationPage} />
          <Route component={NotFound} />
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
