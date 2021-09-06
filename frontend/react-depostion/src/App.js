import React, { Component, Fragment } from "react";
import Header from "./components/Header"
import MainTable from "./components/Deposition table/MainTable"
import MainPlot from "./components/Plot/MainPlot";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <h2>Table</h2>
        <MainTable />
        <h2>Plot</h2>
        <MainPlot />
      </Fragment>
    );
  }
}

export default App;
