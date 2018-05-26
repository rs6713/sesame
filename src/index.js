import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./Login";
import registerServiceWorker from "./registerServiceWorker";

if (window.location.hash === "#login") {
  ReactDOM.render(<Login />, document.getElementById("root"));
} else {
  ReactDOM.render(<App />, document.getElementById("root"));
}
registerServiceWorker();
