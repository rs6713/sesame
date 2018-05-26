import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="/logo.PNG" />
        </header>
        <p className="App-intro">
          <input
            type="file"
            onChange={e => {
              var reader = new FileReader();
              reader.readAsText(e.target.files[0], "UTF-8");
              reader.onload = function(evt) {
                console.log(evt.target.result);
              };
              reader.onerror = function(evt) {
                console.error(evt);
              };
            }}
          />
        </p>
      </div>
    );
  }
}

export default App;
