import React, { Component } from "react";
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return <div className="App">
        
      
      <ul className="images">
          <li><Link to="/insurance"><img src="//c1.staticflickr.com/4/3760/33253390276_5629b46b91_b.jpg" width={100} height={100}/></Link></li>
          </ul>
      
        </div>;
  }
}

export default App;
