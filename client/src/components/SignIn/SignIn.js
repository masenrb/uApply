import React, { Component } from "react";
import { Form, Nav } from "react-bootstrap";
import { Modal, Button, Header } from "semantic-ui-react";
import axios from "axios";
import UserContext from "../../utils/UserContext";

import "./SignIn.scss";

export default class SignIn extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isOpen: false,
    };
  }

  handleSignIn = (e) => {
    const { user, setUser } = this.context;
    const { username, password } = this.state;
    console.log(username);
    e.preventDefault();
    axios
      .get("/api/users/login", {
        params: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        console.log("response");
        this.state = {
          signedIn: true,
          user: res.data[0],
        };
        setUser({ data: res.data[0], isLoggedIn: true });
        localStorage.setItem("data", JSON.stringify(res.data[0]));
        localStorage.setItem("isLoggedIn", true);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ isOpen: false });
  };

  async componentDidMount() {
    const user = this.context;
    console.log(user);
    this.setState({
      username: "",
      password: "",
      isOpen: false,
    });
  }

  render() {
    const { user } = this.context;
    var { isOpen } = this.state;
    return (
      <Modal
        onClose={() => this.setState({ isOpen: false })}
        onOpen={() => this.setState({ isOpen: true })}
        open={isOpen}
        trigger={<Nav.Link>Sign In</Nav.Link>}
        centered={true}
        size="mini"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          height: "320px",
        }}
      >
        <Modal.Content>
          <div>
            <Form className="Sign-in">
              <Header>Sign In.</Header>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ username: e.target.value })}
                  type="username"
                  placeholder="Enter username"
                />
                <Form.Text className="text-muted">
                  We'll never share your username with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ password: e.target.value })}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Header.Subheader
                style={{
                  marginBottom: "15px",
                }}
              >
                New to uApply? <a href="/SignUp">Sign Up</a>.
              </Header.Subheader>
              <Button onClick={this.handleSignIn} primary type="submit">
                Submit
              </Button>
              <Button
                type="cancel"
                onClick={() => this.setState({ isOpen: false })}
              >
                Cancel
              </Button>
            </Form>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}
