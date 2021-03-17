import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
      <div>
        <Navbar bg="light" expand="lg" className="navbar">
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
              <SignIn></SignIn>
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

export default Header;
