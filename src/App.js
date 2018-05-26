import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

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
        <header className="App-header">
          <img alt="Sesame" src="/logo.PNG" />
        </header>
        <p className="App-intro">{this.renderContent()}</p>
      </div>
    );
  }
}

export default App;
