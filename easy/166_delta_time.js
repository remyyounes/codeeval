var Time = function (timeString) {
  var time = timeString.split(":");
  return { hours: +time[0], minutes: +time[1], seconds: +time[2] };
};

var intToTime = function(time) { return ("0"+time).slice(-2);  };

var timeDelta = function (startTime, endTime) {
  if( endTime.seconds < startTime.seconds ) {
    endTime.seconds += 60;
    endTime.minutes--;
  }
  if( endTime.minutes < startTime.minutes ) {
    endTime.minutes += 60;
    endTime.hours--;
  }
  if( endTime.hours < startTime.hours ) startTime.hours += 24;

  return [
    endTime.hours - startTime.hours,
    endTime.minutes - startTime.minutes,
    endTime.seconds - startTime.seconds
  ].map( intToTime ).join(":");
};

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
  if(line !== "") {
    var times = line.split(" ").sort();
    console.log( timeDelta( Time(times[0]), Time(times[1]) ) );
  }
});
