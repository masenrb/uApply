import React from "react";
import ReactDOM from "react-dom";
import DashboardPage from "./DashboardPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DashboardPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
