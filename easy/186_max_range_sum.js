var fs = require('fs');

var MaxRangeSum = function() { };

MaxRangeSum.prototype = {
  parseLine: function(line) {
    return line.split(';');
  },
  processCase: function(line) {
    var input = this.parseLine(line);
    var gap = input[0];
    var max = 0;
    var days = input[1].split(' ').map(function(x) { return parseInt(x, 10);});
    days.reduce( function(memo, item, i, arr) {
      var current = memo + item;
      if (i >= gap) current -= arr[i - gap];
      if (i >= gap - 1) max = Math.max(max, current);
      return current;
    }, 0);
    return max;
  },
};

var details = new MaxRangeSum();
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
  if (line !== '') {
    console.log(details.processCase(line));
  }
});

module.exports = MaxRangeSum;
