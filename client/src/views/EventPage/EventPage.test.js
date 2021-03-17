import React from "react";
import ReactDOM from "react-dom";
import EventPage from "./EventPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<EventPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
