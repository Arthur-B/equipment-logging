import React, { Component, Fragment } from "react";

import Header from "./components/Header"
import MainTable from "./components/Deposition table/MainTable"
import MainPlot from "./components/Plot/MainPlot";

import './components/style.css';

class App extends Component {
  render() {
    return (
      <Fragment>
          <header>
            <Header />
          </header>
          <MainTable />
          <MainPlot />
      </Fragment>
    );
  }
}

export default App;
