import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import SignIn from "../SignIn/SignIn";
import logo from "../../assets/uApply.png";
import "./Header.scss";
import UserContext from "../../utils/UserContext";

class Header extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const { setUser } = this.context;
    setUser(
      {
        data: JSON.parse(localStorage.getItem("data")),
        isLoggedIn: localStorage.getItem("isLoggedIn"),
      },
      function () {
        this.setState({ isLoggedIn: this.localStorage.getItem("isLoggedIn") });
      }
    );
  }

  signOut() {
    const { setUser } = this.context;
    setUser({ data: null, isLoggedIn: false });
    localStorage.setItem("data", null);
    localStorage.setItem("isLoggedIn", false);
    this.setState({ isLoggedIn: false });
    console.log(this.state);
    this.props.history.push("/Landingpage");
  }

  render() {
    const { isLoggedIn } = this.context.user;

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
              <SignIn trigger={<Nav.Link>Sign In</Nav.Link>} />
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

export default withRouter(Header);
