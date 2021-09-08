import { Component, Fragment } from "react";
import { Form, FormGroup, Input, Label,  Row, Col, Toast, ToastHeader, ToastBody } from "reactstrap";
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot} from 'recharts';

import regression from "regression";

function data4regression(depositions) {
    var data = []

    depositions.map(function(item) {
        data.push([
            duration2seconds(item.deposition_time),
            item.thickness
        ]);
    });
    return data;
}


function calculateRegression(rawData) {
    // Get clean data
    const cleanData = data4regression(rawData);

    // Make the regression
    const result = regression.linear(cleanData)
    const gradient = result.equation[0]
    const yIntercept = result.equation[1]

    // Get the data to plot
    const x_col = cleanData.map(x => x[0]);
    const x_min = Math.min.apply(Math, x_col);
    const x_max = Math.max.apply(Math, x_col);

    const y_min = gradient * x_min + yIntercept;
    const y_max = gradient * x_max + yIntercept;

    var xy = [
        {
            "x": x_min,
            "y": y_min,
        },
        {
            "x": x_max,
            "y": y_max,
        }
    ];

    return { xy, gradient, yIntercept }
}

function estimateTime(thickness, gradient, yIntercept) {
    return (thickness - yIntercept) / gradient
}

function duration2seconds(durationStr) {
    if (durationStr !== null) {
        const RegExp = /(?<hours>[0-9]{2}):(?<minutes>[0-9]{2}):(?<seconds>[0-9]{2})/
        const {groups: {hours, minutes, seconds}} = RegExp.exec(durationStr);
        const time = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
        return time
    } else {
        return 0
    }
}

function str_pad_left(string, pad, length ) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

function seconds2duration(timeSeconds) {
    var hours = Math.floor(timeSeconds / 3600);
    timeSeconds = timeSeconds - hours * 3600;
    
    var minutes = Math.floor(timeSeconds / 60);
    timeSeconds = timeSeconds - minutes * 60;
    
    const timeStr = str_pad_left(hours, '0', 2) + ':' + str_pad_left(minutes, '0', 2) + ':' + str_pad_left(timeSeconds, '0', 2)   


    return timeStr
}


function data2xy(depositions) {
    var data = []
    
    depositions.map(function(item) {
        data.push({
            "x": duration2seconds(item.deposition_time),
            "y": item.thickness
        });
    });
    return data;
}


class ThicknessPlot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            target_thickness: 100
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    render() {

        const data = data2xy(this.props.depositions);
        const data_regression = calculateRegression(this.props.depositions);

        return (
            <Fragment>
                <Row>
                    <Col>
                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >
                        <ScatterChart
                            margin={{
                                top: 10,
                                bottom: 30,
                                left: 30,
                                right: 10
                            }}
                        >
                            <CartesianGrid 
                                stroke="#CCC"
                                strokeDasharray="3 3"
                            />
                            <XAxis 
                                dataKey="x"
                                type='number'
                                name="Deposition time (s)"
                                label={{
                                    value: "Deposition time (s)",
                                    position: "bottom"
                                }}
                            />
                            <YAxis 
                                dataKey="y"
                                type='number' 
                                name="Deposition thickness (nm)"
                                label={{
                                    value: "Deposition thickness (nm)",
                                    position: "left",
                                    textAnchor: "middle",
                                    angle: -90
                                }}
                            />
                            <Tooltip />
                            <ReferenceLine
                                segment={data_regression.xy}
                                stroke="#7C7C7C"
                                strokeWidth={2}
                                alwaysShow={true}
                            />
                            <Scatter 
                                data={data}
                                fill="#004191"
                            />
                            <ReferenceDot 
                                x={estimateTime(
                                    this.state.target_thickness, 
                                    data_regression.gradient,
                                    data_regression.yIntercept
                                    )}
                                y={this.state.target_thickness}
                                alwaysShow={true}
                                r={6}
                                fill="red"
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                        <FormGroup>
                            <Label>Target thickness (nm):</Label>
                            <Input
                                type="number"
                                name="target_thickness"
                                onChange={this.onChange}
                                value={this.defaultIfEmpty(this.state.target_thickness)}
                            />
                        </FormGroup>
                        </Form>
                    </Col>
                    <Col>
                        Estimated deposition time:
                        <br />
                        {seconds2duration(estimateTime(
                                            this.state.target_thickness, 
                                            data_regression.gradient,
                                            data_regression.yIntercept
                                            ))}
                    </Col>
                    <Col>
                        Regression equation:
                        <br />
                        y = {data_regression.gradient} x + {data_regression.yIntercept}                
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default ThicknessPlot