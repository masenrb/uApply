import React from "react";
import logo from "../../assets/logo.svg";
import "./DashboardPage.scss";
import Header from "../../components/Header/Header";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import { Card } from "semantic-ui-react";

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
