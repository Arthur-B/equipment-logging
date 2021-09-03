import { Component, Fragment } from "react";
import { HorizontalGridLines, MarkSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";

import '../../node_modules/react-vis/dist/style.css';

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

function getData(depositions) {
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
    render() {

        const depositions = this.props.depositions;
        const data = getData(depositions);

        return (
            <Fragment>
                <XYPlot 
                height={400} 
                width={800}
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis
                        title="Deposition time (s)"
                        position="middle"
                        tickTotal={8}
                        attr="x"
                        attrAxis="y"
                    />
                    <YAxis
                        title="Thickness (nm)"
                        position="middle"
                        tickTotal={8}
                        attr="y"
                        attrAxis="x"
                    />
                    <MarkSeries
                        data={data}
                    />
                </XYPlot>
            </Fragment>
        );
    }
}

export default ThicknessPlot