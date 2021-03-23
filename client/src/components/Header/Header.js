import React, { Component } from "react";
import { Image, Button } from "semantic-ui-react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import SignIn from "../SignIn/SignIn";
import logo from "../../assets/uApply.png";
import "./Header.scss";
import UserContext from "../../utils/UserContext";

export default class Header extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const { setUser } = this.context;
    // const isLoggedIn = user.isLoggedIn;
    // this.setState({ isLoggedIn: isLoggedIn });
    setUser({
      data: JSON.parse(localStorage.getItem("data")),
      isLoggedIn: localStorage.getItem("isLoggedIn"),
    });
    this.setState({ isLoggedIn: localStorage.getItem("isLoggedIn") });
  }

  signOut() {
    console.log("test");
    const { setUser } = this.context;
    console.log(this.context);
    setUser({ data: {}, isLoggedIn: false });
    localStorage.setItem("data", {});
    localStorage.setItem("isLoggedIn", false);
    this.setState({ isLoggedIn: false });
    console.log(this.state);
  }

  render() {
    console.log(this.context);
    const { isLoggedIn } = this.context.user;
    console.log("isLoggedIn: " + isLoggedIn);

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
              {isLoggedIn && <Nav.Link href="/Dashboard">Dashboard</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
          {!isLoggedIn && (
            <Nav.Item>
              <SignIn />
            </Nav.Item>
          )}
          {isLoggedIn && (
            <Nav.Item>
              <Nav.Link onClick={this.signOut.bind(this)}>Sign Out</Nav.Link>
            </Nav.Item>
          )}
        </Navbar>
      </div>
    );
  }
}
