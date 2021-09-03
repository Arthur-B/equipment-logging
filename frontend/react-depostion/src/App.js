import React, { Component, Fragment } from "react";
import Header from "./components/Header"
import Home from "./components/Home"
// import PlotComponent from "./components/PlotComponent";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <h2>Table</h2>
        <Home />
        <h2>Plot</h2>
        
      </Fragment>
    );
  }
}

export default App;
