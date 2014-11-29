var zerosToBinaryDigits = function(zeros) {
  var binary = [], operands = null, digit = null;
  while (zeros.length) {
    operands = zeros.splice(0, 2);
    digit = operands[0] === "00" ? "1" : "0";
    operands[1].split("").forEach( function() { binary.push(digit); } );
  }
  return binary;
};

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
  if(line !== "") {
    var digits = zerosToBinaryDigits(line.split(" "));
    console.log(parseInt(digits.join(""), 2));
  }
});
