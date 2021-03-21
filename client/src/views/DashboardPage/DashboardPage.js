import React from "react";
import logo from "../../assets/logo.svg";
import "./DashboardPage.scss";
import Header from "../../components/Header/Header";
import UpcomingEvents from "../../components/Calender/UpcomingEvents.js";


function DashboardPage() {
  return (
    <div className="App">
      <UpcomingEvents />
    </div>
  );
}

export default DashboardPage;
