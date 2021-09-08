import { Component, Fragment} from "react";

import { Form, FormGroup, Input, Label, Row, Col, Container } from "reactstrap";
import axios from "axios";

import { API_URL } from "../../constants";

import ThicknessPlot from "./ThicknessPlot";
import DepRatePlot from "./DepRatePlot";


class MainPlot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            depositions: [],
            depositions_plot: [],
            material: "",
            power: "",
            pressure: ""
        }
    }

    filterDepositions = depositions => {

        const material = this.state.material;
        const power = this.state.power;
        const pressure = this.state.pressure;

        if (material && depositions.material !== material) return false;
        if (power && depositions.power !== Number(power)) return false;
        if (pressure && depositions.pressure !== Number(pressure)) return false;
        return true;

    }

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // Get all depositions from API and keep the ones with non zero thickness
    getDepositions = () => {
        axios.get(API_URL)
            .then(res => this.setState({ depositions: res.data.filter(dep => dep.thickness !== null)}));
     };

    resetState = () => {
        this.getDepositions();
    };

    componentDidMount() {
        this.resetState();
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <h2> Plot </h2> 
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3> Data selection</h3> 
                        </Col>
                    </Row>

                    <Form>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="material">Material:</Label>
                                <Input
                                    type="text" 
                                    name="material"
                                    onChange={this.onChange}
                                    value={this.defaultIfEmpty(this.state.material)}
                                />
                            </FormGroup>
                        </Col>
                        <Col>    
                            <FormGroup>
                                <Label for="power">Power (W):</Label>
                                <Input
                                    type="number"
                                    name="power"
                                    onChange={this.onChange}
                                    value={this.defaultIfEmpty(this.state.power)}
                                />
                            </FormGroup>
                        </Col>
                        <Col>  
                            <FormGroup>
                                <Label for="pressure">Pressure (mTorr):</Label>
                                <Input
                                    type="number"
                                    name="pressure"
                                    onChange={this.onChange}
                                    value={this.defaultIfEmpty(this.state.pressure)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    </Form>
                    <Row>
                        <Col>
                            <h3> Thickness VS deposition time </h3>
                            </Col>
                    </Row>
                            
                    <ThicknessPlot 
                        depositions={this.state.depositions.filter(this.filterDepositions)}
                        resetState={this.resetState}
                    />
                    
                    
                    <Row>
                        <Col>
                        <h3> Deposition rate </h3>

                        <DepRatePlot 
                            depositions={this.state.depositions.filter(this.filterDepositions)}
                            resetState={this.resetState}
                        />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default MainPlot