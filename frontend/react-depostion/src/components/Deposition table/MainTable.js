import React, { Component, Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";

import { API_URL } from "../../constants";
import DepositionList from "./DepositionList";
import NewDepositionModal from "./NewDepositionModal";
import ExportCsv from "./ExportCsv";

class MainTable extends Component {
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
                <Container>
                    <Row>   
                        <Col>
                            <h2> Recent depositions</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <DepositionList
                            depositions={this.state.depositions.slice(-5)}
                            resetState={this.resetState}
                        />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <NewDepositionModal
                                create={true}
                                resetState={this.resetState}
                            />
                            <ExportCsv
                                depositions={this.state.depositions}
                                resetState={this.resetState}
                            />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default MainTable