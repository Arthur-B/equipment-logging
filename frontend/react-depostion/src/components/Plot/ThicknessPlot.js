import { Component, Fragment } from "react";
import { HorizontalGridLines, LineSeries, MarkSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";
import regression from "regression";

import '../../../node_modules/react-vis/dist/style.css';

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


//input X and calculate Y using the formula found
//this works with all types of regression
function formula(coeff, x) {
    var result = null;
    for (var i = 0, j = coeff.length - 1; i < coeff.length; i++, j--) {
      result += coeff[i] * Math.pow(x, j);
    }
    return result;
  }
  
  //setting theoretical data array of [X][Y] using experimental X coordinates
  //this works with all types of regression
function setTheoryData(rawData) {
    // var result = regression.linear(rawData);
    const data = rawData.map(dict => [Number(dict.x), Number(dict.y)]);
    var result = regression.linear(data);
    var coeff = result.equation;    
    var theoryData = [];
    for (var i = 0; i < rawData.length; i++) {
      theoryData[i] = [rawData[i][0], formula(coeff, rawData[i][0])];
    }
    return theoryData;
  }


class ThicknessPlot extends Component {
    render() {

        const data = data2xy(this.props.depositions);
        const data2 = setTheoryData(data);
        
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
                    <LineSeries
                        data={data2}
                    />
                </XYPlot>
                {data2}
            </Fragment>
        );
    }
}

export default ThicknessPlot