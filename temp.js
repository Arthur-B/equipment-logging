const RegExp = /(?<hours>[0-9]{2}):(?<minutes>[0-9]{2}):(?<seconds>[0-9]{2})/
const durationString = "01:02:25";
const {groups: {hours, minutes, seconds}} = RegExp.exec(durationString);
const time = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);


console.log(time);