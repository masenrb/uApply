import React, { Component } from "react";
import logo from "../../assets/logo.svg";
import "./LandingPage.css";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>This is the landing page.</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </header>
      </div>
    );
  }
}
