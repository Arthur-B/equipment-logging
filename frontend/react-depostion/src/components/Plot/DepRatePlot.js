import { Component, Fragment } from "react";
import {ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';


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
            "x": item.id,
            "y": item.thickness / duration2seconds(item.deposition_time)
        });
    });
    return data;
}


class DepRatePlot extends Component {
    render() {

        const data = data2xy(this.props.depositions);
        
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
                        data={data}
                    >
                    <CartesianGrid 
                        stroke="#ccc"
                        strokeDasharray="3 3"
                    />
                    <XAxis 
                        dataKey="x"
                        type='number'
                        name="id"
                        label={{
                            value: "Deposition id",
                            position: "bottom"
                        }}
                    />
                    <YAxis 
                        dataKey="y"
                        type='number' 
                        name="Deposition rate (nm/s)"
                        label={{
                            value: "Deposition rate (nm/s)",
                            position: "left",
                            textAnchor: "middle",
                            angle: -90
                        }}
                    />
                    <Tooltip />
                    <Scatter 
                        data={data}
                        fill="#004191"
                    />
                    </ScatterChart>
                </ResponsiveContainer>
            </Fragment>
        );
    }
}

export default DepRatePlot