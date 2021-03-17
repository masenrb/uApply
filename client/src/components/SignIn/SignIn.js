import React, { Component } from "react";
import { Form, Nav, Card } from "react-bootstrap";
import { Modal, Button, Header, Image } from "semantic-ui-react";
import logo from "../../assets/uApply.png";

import "./SignIn.scss";

// export default class SignIn extends Component {
//   render() {
//     const [open, setOpen] = React.useState(false);
//     return (

//     );
//   }
// }

function SignIn() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Nav.Link>Sign In</Nav.Link>}
      centered={true}
      size="mini"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        // width: "20%",
        height: "320px",
      }}
    >
      <Modal.Content>
        <div>
          <Form className="Sign-in">
            <Header>Sign In.</Header>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Enter username" />
              <Form.Text className="text-muted">
                We'll never share your username with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Header.Subheader
              style={{
                marginBottom: "15px",
              }}
            >
              New to uApply? <a href="/SignUp">Sign Up</a>.
            </Header.Subheader>
            <Button onClick={() => setOpen(false)} primary type="submit">
              Submit
            </Button>
            <Button type="cancel" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Form>
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default SignIn;