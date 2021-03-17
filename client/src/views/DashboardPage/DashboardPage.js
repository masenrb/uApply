import React from "react";
import logo from "../../assets/logo.svg";
import "./DashboardPage.scss";
import Header from "../../components/Header/Header";
import DashboardCard from "../../components/Dashboard/DashboardCard";

function DashboardPage() {
  return (
    <div className="dashboard">
      <DashboardCard/>
    </div>
  );
}

export default DashboardPage;
