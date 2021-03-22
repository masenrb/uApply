import React, { Component } from "react";
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
      isLoggedIn: false,
      user: 0,
      location: "",
      isLandingPage: false,
    };
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
      location: this.props.location,
      isLandingPage: this.props.location === "/Landingpage",
    });
  }

  signOut() {
    this.setState({ user: 0, isLoggedIn: false });
    this.props.history.push("/Landingpage");
  }

  render() {
    const { isLandingPage, isLoggedIn } = this.state;

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
              <Nav.Link href="/Landingpage">Sign Out</Nav.Link>
            </Nav.Item>
          )}
        </Navbar>
      </div>
    );
  }
}
