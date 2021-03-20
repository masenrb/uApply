import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import SignIn from "../SignIn/SignIn";
import logo from "../../assets/uApply.png";
import "./Header.scss";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      isLandingPage: false,
    };
  }

  componentDidMount() {
    this.setState({
      location: this.props.location,
      isLandingPage: this.props.location === "/Landingpage",
    });
  }

  render() {
    const { activeItem } = this.state;
    var { location, isLandingPage } = this.state;
    // if (location !== "/Landingpage") {
    //   this.setState({
    //     location: location,
    //     isLandingPage: false,
    //   });
    // } else {
    //   this.setState({
    //     location: location,
    //     isLandingPage: true,
    //   });
    // }

    return (
      <div>
        <Navbar expand="lg">
          <Navbar.Brand href="/Landingpage">
            <Image style={{ width: "60px" }} src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/Landingpage">Home</Nav.Link>
              {!isLandingPage && (
                <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          {isLandingPage && (
            <Nav.Item>
              <SignIn />
            </Nav.Item>
          )}
          {!isLandingPage && (
            <Nav.Item>
              <Nav.Link>Sign Out</Nav.Link>
            </Nav.Item>
          )}
        </Navbar>
      </div>
    );
  }
}
