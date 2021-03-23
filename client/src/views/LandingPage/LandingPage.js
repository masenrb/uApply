import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Grid, Image, Header } from "semantic-ui-react";
import logo from "../../assets/uApply.png";

import "./LandingPage.scss";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: 0,
    };
    // this.isLoggedIn = this.isLoggedIn.bind(this);
    console.log(this);
  }

  componentDidMount() {
    this.setState({
      isLoggedIn: this.props.user,
      user: this.props.user,
    });
    // console.log(this.props);
  }

  render() {
    return (
      <div className="App-header">
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Header size="huge">
                Welcome!
                <Header.Subheader
                  style={{
                    marginTop: "5%",
                  }}
                >
                  Looking for a place to organize all your job/internship
                </Header.Subheader>
                <Header.Subheader>
                  applications and keep track of your professional connections?
                </Header.Subheader>
                <Button
                  style={{
                    marginTop: "5%",
                  }}
                >
                  Get Started!
                </Button>
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Image
                style={{
                  marginLeft: "5%",
                }}
                size="massive"
                src={logo}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
