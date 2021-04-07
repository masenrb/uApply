import React, { Component } from 'react';
import { Header, Card, Grid, Button } from 'semantic-ui-react';
import DashboardCard from '../../components/Dashboard/DashboardCard';
import { Link } from 'react-router-dom';
import Stats from '../../components/Stats/Stats';
import './DashboardPage.scss';
import UserContext from '../../utils/UserContext';
import axios from 'axios';

export default class DashboardPage extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: [],
      applicationOffers: [],
      applicationInterviews: [],
      applicationAwaitingResponse: [],
      events: [],
    };
  }

  async componentDidMount() {
    const olduser = JSON.parse(localStorage.getItem('data'));
    var applicationOffers = [];
    var applicationInterviews = [];
    var applicationAwaitingResponse = [];
    var stats = {};
    var events = [];
    axios
      .get('api/users/getuser', {
        params: {
          username: olduser.userName,
        },
      })
      .then((user) => {
        user = user.data[0];
        const applications = user.applications;
        stats = user.stats;
        for (var i = 0; i < applications.length; i++) {
          if (applications[i].status === 'Offer Received') {
            applicationOffers.push(
              <DashboardCard key={i} value={applications[i]} />
            );
          } else if (applications[i].status === 'Awaiting Response') {
            applicationAwaitingResponse.push(
              <DashboardCard key={i} value={applications[i]} />
            );
          } else if (
            applications[i].status === 'Interview 1' ||
            applications[i].status === 'Interview 2' ||
            applications[i].status === 'Interview 3'
          ) {
            applicationInterviews.push(
              <DashboardCard key={i} value={applications[i]} />
            );
          }
          for (var j = 0; j < applications[i].events.length; j++) {
            events.push(applications[i].events[j]);
          }
        }
        this.setState({
          user: user,
          isLoading: false,
          isOpen: false,
          applicationOffers: applicationOffers,
          applicationInterviews: applicationInterviews,
          applicationAwaitingResponse: applicationAwaitingResponse,
          events: events,
          stats: stats,
        });
      })
      .then(() => {
        this.props.history.push('/Dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const userName = this.context.user.data.userName;
    return (
      <div className="dashboard">
        {!this.state.isLoading && (
          <Grid
            style={{
              marginTop: '1%',
              marginLeft: '3%',
            }}
            columns={2}
          >
            <Grid.Row>
              <Grid.Column
                style={
                  {
                    // width: "70%",
                  }
                }
                width={10}
              >
                <Header as="h2">Offer Received</Header>
                <Card.Group>{this.state.applicationOffers}</Card.Group>
                <Header as="h2">Interviews Scheduled</Header>
                <Card.Group>{this.state.applicationInterviews}</Card.Group>
                <Header as="h2">Awaiting Response</Header>
                <Card.Group>
                  {this.state.applicationAwaitingResponse}
                </Card.Group>
              </Grid.Column>

              <Grid.Column width={5}>
                <Header as="h2" textAlign="center">
                  Welcome back, {userName}!
                </Header>
                <Link to="/CreateApplication">
                  <Button
                    style={{
                      marginBottom: '5%',
                      marginLeft: '35%',
                    }}
                  >
                    Add Application
                  </Button>
                </Link>
                <Stats stats={this.state.stats}></Stats>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}
