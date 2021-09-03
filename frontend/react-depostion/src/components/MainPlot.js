import { Component, Fragment } from "react";
import axios from "axios";

import { API_URL } from "../constants";

import ThicknessPlot from "./ThicknessPlot";

class MainPlot extends Component {
    state = {
        depositions: []
    };

    componentDidMount() {
        this.resetState();
    }

    getDepositions = () => {
        axios.get(API_URL).then(res => this.setState({ depositions: res.data}));
    };

    resetState = () => {
        this.getDepositions();
    };

    render() {
        
        return (
            <Fragment>
                <h3>Thickness VS Deposition time</h3>
                <ThicknessPlot 
                    depositions={this.state.depositions}
                    resetState={this.resetState}
                />
            </Fragment>
        );
    }
}

export default MainPlot