import React, { Component } from "react";
import { Header, Card, Grid } from "semantic-ui-react";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import Stats from "../../components/Stats/Stats";
import "./DashboardPage.scss";
import UserContext from "../../utils/UserContext";
import Header from "../../components/Header/Header";
import UpcomingEvents from "../../components/Calender/UpcomingEvents.js";

export default class DashboardPage extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = { isLoading: true, user: [] };
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem("data"));
    console.log(user);
    this.setState({ user: user, isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    var applicationOffers = [];
    var applicationInterviews = [];
    var applicationAwaitingResponse = [];
    var stats = {};
    if (!isLoading) {
      const { user } = this.state;
      console.log(user);
      const applications = user.applications;
      stats = user.stats;
      for (var i = 0; i < applications.length; i++) {
        // push the component to elements!
        if (applications[i].status === "Offer Received") {
          applicationOffers.push(
            <DashboardCard key={i} value={applications[i]} />
          );
        } else if (applications[i].status === "Awaiting Response") {
          applicationAwaitingResponse.push(
            <DashboardCard key={i} value={applications[i]} />
          );
        } else if (
          applications[i].status === "Interview 1" ||
          applications[i].status === "Interview 2" ||
          applications[i].status === "Interview 3"
        ) {
          applicationInterviews.push(
            <DashboardCard key={i} value={applications[i]} />
          );
        }
      }
    }
    return (
      <div className="dashboard">
        {!isLoading && (
          <Grid
            style={{
              marginTop: "1%",
              marginLeft: "3%",
            }}
            columns={2}
          >
            <Grid.Row>
              <Grid.Column
                style={{
                  width: "70%",
                }}
              >
                <Header as="h2">Offer Received</Header>
                <Card.Group>{applicationOffers}</Card.Group>
                <Header as="h2">Interviews</Header>
                <Card.Group>{applicationInterviews}</Card.Group>
                <Header as="h2">Awaiting Response</Header>
                <Card.Group>{applicationAwaitingResponse}</Card.Group>
              </Grid.Column>
              <UpcomingEvents />
              <Stats stats={stats}></Stats>
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}
