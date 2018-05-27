import React, { Component } from "react";

class Login extends Component {
    
  submit() {
      
  }
    
  render() {
    return (
      <div className="App">
        <div className="pt-form-group">
          <label className="pt-label" for="example-form-group-input-a">
            Username
          </label>
          <div className="pt-form-content">
            <input
              id="example-form-group-input-a"
              className="pt-input"
              style={{ width: 300 }}
              placeholder="Username"
              type="text"
              dir="auto"
            />
          </div>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" for="example-form-group-input-b">
            Password
          </label>
          <div className="pt-form-content">
            <div className="pt-input-group">
              <input
                id="example-form-group-input-b"
                className="pt-input"
                style={{ width: 300 }}
                type="password"
                dir="auto"
              />
            </div>
          </div>
        </div>
        <div className="pt-form-group">
          <div className="pt-form-content" style={{ marginTop: 10 }}>
            <button type="button" className="pt-button pt-intent-success" onSubmit={this.submit}>
              Login
              <span className="pt-icon-standard pt-icon-arrow-right pt-align-right" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
