import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./Login";
import Signup from "./Signup";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(
  <Router>
    <div>
      <Route exact={true} path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
