import { Component, Fragment } from "react";
import {ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Line, ReferenceLine, LineChart} from 'recharts';
import regression from "regression";


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



class ThicknessPlot extends Component {
    render() {

        const data = data2xy(this.props.depositions);
        const data_regression = calculateRegression(this.props.depositions);

        return (
            <Fragment>
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
                        <CartesianGrid stroke="#ccc" />
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
                            stroke="black"
                            alwaysShow={true}
                        />
                        <Scatter 
                            data={data}
                            fill="#004191"
                        />
                    </ScatterChart>
                </ResponsiveContainer>
                
                <p>
                    Regression line: y = {data_regression.gradient} x + {data_regression.yIntercept}
                </p>
                
            </Fragment>
        );
    }
}

export default ThicknessPlot