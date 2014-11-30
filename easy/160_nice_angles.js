var intToTime = function(n) { return ("0"+Math.floor(n)).slice(-2);  };
var ratioToTime =function(ratio) {
  var seconds = ratio * 3600;
  var minutes = Math.floor(seconds / 60);
  seconds %= 60;
  return intToTime(minutes) + "'" + intToTime(seconds) + '"';
};

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
  if(line !== "") {
    var number = Math.floor(line);
    var time = ratioToTime(line % 1);
    console.log( number+ "." + time);
  }
});
