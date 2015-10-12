var fs = require('fs');

var Details = function() { };

Details.prototype = {
  parseLine: function(line) {
    return line.split(',');
  },
  processCase: function(line) {
    var lines = this.parseLine(line);
    return lines.map(this.findGap).reduce(function(memo, n) {
      return Math.min(memo, n);
    });
  },
  findGap: function(line) {
    var x = line.lastIndexOf('X');
    var y = line.indexOf('Y');
    return y - x - 1;
  },
};

var details = new Details();
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
  if (line !== '') {
    console.log(details.processCase(line));
  }
});

module.exports = Details;
