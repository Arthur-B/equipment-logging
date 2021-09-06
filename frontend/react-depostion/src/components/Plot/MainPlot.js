import { Component, Fragment } from "react";

import { Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

import { API_URL } from "../../constants";

import ThicknessPlot from "./ThicknessPlot";
import DepRatePlot from "./DepRatePlot";

class MainPlot extends Component {
    
    state = {
        depositions: [],
        depositions_plot: [],
        material: "",
        power: "",
        pressure: ""
    };

    filterDepositions = depositions => {

        const material = this.state.material;
        const power = this.state.power;
        const pressure = this.state.pressure;

        // Can include thickness filtering here too
        if (material && depositions.material !== material) return false;
        if (power && depositions.power !== Number(power)) return false;
        if (pressure && depositions.pressure !== Number(pressure)) return false;
        return true;

    }

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    getDepositions = () => {
        axios.get(API_URL).then(res => this.setState({ depositions: res.data}));
     };

    resetState = () => {
        this.getDepositions();
    };

    componentDidMount() {
        this.resetState();
    }

    render() {

        this.resetState()
        this.state.depositions_plot = this.state.depositions.filter(dep => dep.thickness !== null)
        this.state.depositions_plot = this.state.depositions_plot.filter(this.filterDepositions)


        return (
            <Fragment>
                <h3>Thickness VS Deposition time</h3>
                <Form>
                    <FormGroup>
                        <Label for="material">Material</Label>
                        <Input
                            type="text" 
                            name="material"
                            onChange={this.onChange}
                            value={this.defaultIfEmpty(this.state.material)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="power">Power:</Label>
                        <Input
                            type="number"
                            name="power"
                            onChange={this.onChange}
                            value={this.defaultIfEmpty(this.state.power)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pressure">Pressure:</Label>
                        <Input
                            type="number"
                            name="pressure"
                            onChange={this.onChange}
                            value={this.defaultIfEmpty(this.state.pressure)}
                        />
                    </FormGroup>
                </Form>

                <ThicknessPlot 
                    depositions={this.state.depositions_plot}
                    resetState={this.resetState}
                />
                <DepRatePlot 
                    depositions={this.state.depositions_plot}
                    resetState={this.resetState}
                />
            </Fragment>
        );
    }
}

export default MainPlot