import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";

 
import Movies from "./components/movies";


class App extends Component {
  render() {
    return (
      <React.Fragment>
         
        <main role="main" className="container">
          <Movies />
        </main>
       
      </React.Fragment>
    );
  }
}

export default App;
