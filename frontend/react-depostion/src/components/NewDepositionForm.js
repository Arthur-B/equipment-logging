import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

import { API_URL } from "../constants";

class NewDepositionForm extends React.Component {
    state = {
        id: 0,
        day: "",
        user: "",
        material: "",
        power: "",
        pressure: "",
        mfc_flow: "",
        deposition_time: "",
        thickness: "",
        comment: ""
    };

    componentDidMount() {
        if (this.props.deposition) {
            const { id, day, user, material, power, pressure, mfc_flow, deposition_time, thickness, comment } = this.props.deposition;
            this.setState({ id, day, user, material, power, pressure, mfc_flow, deposition_time, thickness, comment });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    createDeposition = e => {
        e.preventDefault();
        axios.post(API_URL, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    editDeposition = e => {
        e.preventDefault();
        axios.put(API_URL + this.state.id, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    render(){
        return(
            <Form onSubmit={this.props.deposition ? this.editDeposition : this.createDeposition}>
                <FormGroup>
                    <Label for="day">Day:</Label>
                    <Input
                        type="date"
                        name="day"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.day)}
                    />
                </FormGroup>

                <FormGroup>  
                    <Label for="user">Name:</Label>
                    <Input
                        type="text"
                        name="user"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.user)}
                    />
                </FormGroup>

                {/* <FormGroup>
                    <Label for="material">Material</Label>
                    <Input
                        type="select" 
                        name="material"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.material)}
                    >
                        <option>SiO2</option>
                        <option>Si</option>
                    </Input>
                </FormGroup> */}

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

                <FormGroup>
                    <Label for="mfc_flow">MFC Flow:</Label>
                    <Input
                        type="number"
                        name="mfc_flow"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.mfc_flow)}
                    />
                </FormGroup>

                {/* <FormGroup>
                    <Label for="deposition_time">Deposition time:</Label>
                    <Input
                        type="time"
                        name="deposition_time"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.deposition_time)}
                    />
                </FormGroup> */}

                <FormGroup>
                    <Label for="deposition_time">Deposition time:</Label>
                    <Input
                        type="text"
                        name="deposition_time"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.deposition_time)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="thickness">Thickness:</Label>
                    <Input
                        type="number"
                        name="thickness"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.thickness)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="comment">Comment:</Label>
                    <Input
                        type="text"
                        name="comment"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.comment)}
                    />
                </FormGroup>

                <Button>Send</Button>

            </Form>
        );
    }
}

export default NewDepositionForm;