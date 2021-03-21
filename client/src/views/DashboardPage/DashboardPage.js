import React from "react";
import { Card } from "semantic-ui-react";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import "./DashboardPage.scss";
import Header from "../../components/Header/Header";
import UpcomingEvents from "../../components/Calender/UpcomingEvents.js";


const DashboardPage = () => {

  return (
    <div className="dashboard">
      <Card.Group>
        <DashboardCard/>
      </Card.Group>
      <UpcomingEvents />
    </div>
  );
}

export default DashboardPage;
