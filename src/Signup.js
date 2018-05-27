import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="App">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputName"
              placeholder=""
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Age</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputAge"
              placeholder=""
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Gender</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputAge"
              placeholder=""
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Person to Contact</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputAge"
              placeholder=""
            />
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Disability</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputAge"
              placeholder=""
            />
            <div class="row disability_details">
              <div class="col-md-6">
                <label for="exampleInputPassword1">Type</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputAge"
                  placeholder=""
                />
              </div>
              <div class="col-md-6">
                <label for="exampleInputPassword1">Severity</label>
                <div class="row">
                  <div class="input-group-text">
                    <input
                      type="radio"
                      aria-label="Checkbox for following text input"
                    />
                  </div>
                  <label class="disability_label" for="exampleInputPassword1">
                    Mild
                  </label>
                </div>
                <div class="row">
                  <div class="input-group-text">
                    <input
                      type="radio"
                      aria-label="Checkbox for following text input"
                    />
                  </div>
                  <label class="disability_label" for="exampleInputPassword1">
                    Moderate
                  </label>
                </div>
                <div class="row">
                  <div class="input-group-text">
                    <input
                      type="radio"
                      aria-label="Checkbox for following text input"
                    />
                  </div>
                  <label class="disability_label" for="exampleInputPassword1">
                    Severe
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-default">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
