import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="App">
        <div class="input-group_login">
          <input
            type="text"
            class="form-control login"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div class="input-group_login">
          <input
            type="text"
            class="form-control login"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
        </div>

        <ul class="nav flex-column">
          <li class="nav-item">
            <button type="button" class="btn_login btn-secondary">
              Login
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn_login btn-secondary">
              Signup
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Login;
