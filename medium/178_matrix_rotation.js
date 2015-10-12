var fs  = require("fs");
var MatrixRotator = function() { };

MatrixRotator.prototype = {
  parseLine: function(line) {
    var parsed = line.split(' ');
    var dimmension = Math.sqrt(parsed.length);
    return {
      dimensions: dimensions,
      items: parsed,
    };
  },

  rotate: function(items, dimensions) {
    var rotated = [];
    for (var row = 0; row < dimensions; row++) {
      for (var col = dimensions-1; col >=0; col--) {
        var idx = dimensions * (col+1) - (dimensions - row);
        rotated.push( items[idx] );
      }
    }
    return rotated;
  },

  processCase: function(input) {
    var parsed = this.parseLine(input);
    return this.rotate(parsed.items, parsed.dimensions).join(' ');
  },
};

var matrixRotator = new MatrixRotator();
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
      var rotated = matrixRotator.processCase(line);
      console.log(rotated);
    }
});

module.exports = MatrixRotator;
