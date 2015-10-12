var fs  = require("fs");
var MaxFinder = function() { };

MaxFinder.prototype = {
  parseLine: function(line) {
    var rows = line.split(' | ');
    return rows.map(
      function(row){
        return row.split(' ').map(function(i) {return parseInt(i);});
      }
    );
  },
  processCase: function(input) {
    var rows = this.parseLine(input);
    var memo = rows[0];
    rows.map(function(row) {
      row.map( function(colVal, col) {
        if (colVal > memo[col]) {
          memo[col] = colVal;
        }
      });
    });
    return memo;
  },
};

var maxFinder = new MaxFinder();

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
      var max = maxFinder.processCase(line);
      var answer = max.join(' ');
      console.log(answer);
    }
});

module.exports = MaxFinder;
