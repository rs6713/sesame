import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
/*
var spawn = require('child_process').spawn
//var PythonShell = require('python-shell');
var pythonProcess = spawn('python',["./doc_read.py"]);
pythonProcess.stdout.on('data', function (data){
  console.log(data)
  // Do something with the data returned from python script
});
*/

const LOADING = "loading";
const RESULTS = "results";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  onUpload = e => {
    var reader = new FileReader();
    this.setState({ state: LOADING });
    reader.readAsText(e.target.files[0], "UTF-8");
    reader.onload = evt => {
      console.log(evt)
      //var spawn = require("child_process").spawn;

      //var pyshell = new PythonShell('./doc_read.py');
      //pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
      //  console.log(message);
      //});
      /*
      var pythonProcess = spawn('python',["./doc_read.py"]);
      pythonProcess.stdout.on('data', function (data){
        console.log(data)
        // Do something with the data returned from python script
      });
      */
      this.setState({ content: evt.target.result });
      setTimeout(() => {
        this.setState({ state: RESULTS });
      }, 1000);
    };
    reader.onerror = evt => {
      console.error(evt);
    };
  };

  renderUpload() {
    return (
      <div>
        <h1>Upload an Insurance Policy</h1>
        <input type="file" onChange={this.onUpload} />
      </div>
    );
  }

  renderLoading() {
    return (
      <div class="loaderContainer">
        <div class="loader" />
      </div>
    );
  }

  renderResults() {
    return <div>Results</div>;
  }

  renderContent() {
    switch (this.state.state) {
      case LOADING:
        return this.renderLoading();
        break;
      case RESULTS:
        return this.renderResults();
        break;
      default:
        return this.renderUpload();
    }
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">{this.renderContent()}</p>
      </div>
    );
  }
}

export default App;
