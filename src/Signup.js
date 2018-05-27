import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="App">
        <div className="pt-form-group">
          <label className="pt-label" for="example-form-group-input-a">
            Name
          </label>
          <div className="pt-form-content">
            <input
              id="example-form-group-input-a"
              className="pt-input"
              style={{ width: 300 }}
              placeholder="Name"
              type="text"
              dir="auto"
            />
          </div>
        </div>
        <div className="pt-form-group">
          <label className="pt-label" for="example-form-group-input-b">
            Age
          </label>
          <div className="pt-form-content">
            <div className="pt-input-group">
              <input
                id="example-form-group-input-b"
                className="pt-input"
                style={{ width: 300 }}
                type="text"
                placeholder="Age"
                dir="auto"
              />
            </div>
          </div>
        </div>

        <div className="pt-form-group">
          <label className="pt-label" for="example-form-group-input-b">
            Disablilty
          </label>
          <div className="pt-form-content">
            <div className="pt-input-group">
              <div class="pt-select .modifier">
                <select>
                  <option selected>Choose an item...</option>
                  <option value="1">Blind</option>
                  <option value="2">Deaf</option>
                  <option value="3">Autism</option>
                  <option value="4">Intellectual Disability</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-form-group">
          <label className="pt-label" for="example-form-group-input-b">
            Severity
          </label>
          <div className="pt-form-content">
            <div className="pt-input-group">
              <div class="pt-select .modifier">
                <select>
                  <option selected>Choose an item...</option>
                  <option value="1">Mild</option>
                  <option value="2">Severe</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-form-group">
          <label className="pt-label" for="example-form-group-input-b">
            Gender
          </label>
          <div className="pt-form-content">
            <div className="pt-input-group">
              <div class="pt-select .modifier">
                <select>
                  <option selected>Choose an item...</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-form-group">
          <div className="pt-form-content">
            <button type="button" className="pt-button pt-intent-success">
              Save
              <span className="pt-icon-standard pt-icon-arrow-right pt-align-right" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
