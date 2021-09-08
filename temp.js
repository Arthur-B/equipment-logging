// import regression from 'regression';

// // const RegExp = /(?<hours>[0-9]{2}):(?<minutes>[0-9]{2}):(?<seconds>[0-9]{2})/
// // const durationString = "01:02:25";
// // const {groups: {hours, minutes, seconds}} = RegExp.exec(durationString);
// // const time = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

// const data = [
//     {'x': 0, 'y': 0},
//     {'x': 1, 'y': 1.1},
//     {'x': 2, 'y': 1.8},
//     {'x': 3, 'y': 3.3},
// ];

// var values = data.map(dict => [dict.x, dict.y]);

// //input X and calculate Y using the formula found
// //this works with all types of regression
// function formula(coeff, x) {
//     var result = null;
//     for (var i = 0, j = coeff.length - 1; i < coeff.length; i++, j--) {
//       result += coeff[i] * Math.pow(x, j);
//     }
//     return result;
//   }
  
//   //setting theoretical data array of [X][Y] using experimental X coordinates
//   //this works with all types of regression
// function setTheoryData(rawData) {
//     // var result = regression.linear(rawData);
//     const data = rawData.map(dict => [Number(dict.x), Number(dict.y)]);
//     var result = regression.linear(data);
//     var coeff = result.equation;    
//     var theoryData = [];
//     for (var i = 0; i < rawData.length; i++) {
//       theoryData[i] = [rawData[i][0], formula(coeff, rawData[i][0])];
//     }
//     return theoryData;
//   }

// var data2 = setTheoryData(data)

// console.log(data2);

// import { regression } from 'regression';

const data = [
    {"x": 0, "y": 0},
    {"x": 1, "y": 1.1},
    {"x": 2, "y": 1.9}
]

const data2 = [
    [0, 0],
    [1, 1.1],
    [2, 1.9]
]

// const data_regression = Object.values(data);
const data_regression = data2.map(x => x[0])
const x_min = Math.min.apply(Math, data2.map(x => x[0]))

// const result = regression.linear(Object.values(data));
// const gradient = result.equation[0];
// const yIntercept = result.equation[1];

console.log(x_min)