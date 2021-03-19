import React from "react";
import { Card } from "semantic-ui-react";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import "./DashboardPage.scss";

const DashboardPage = () => {

  return (
    <div className="dashboard">
      <Card.Group>
        <DashboardCard/>
      </Card.Group>
    </div>
  );
}

export default DashboardPage;
