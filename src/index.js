import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tab, Tabs } from "@blueprintjs/core";

ReactDOM.render(
  <Router>
    <div>
      <div className="center_block">
        <img className="centered" src="/logo.PNG" alt="" />
      </div>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/insurance" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <div className="nav">
        <Tabs id="TabsExample" selectedTabId="rx">
          <li className="pt-tab" role="tab">
            <Link to="/">Home</Link>
          </li>
          <li className="pt-tab" role="tab">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="pt-tab" role="tab">
            <Link to="/login">Login</Link>
          </li>
        </Tabs>
      </div>
    </div>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
