var fs = require('fs');

function without(arr, i) {
  return [].concat(arr.slice(0, i)).concat(arr.slice(i + 1));
}

var MoveFinder = function() { };

MoveFinder.prototype = {
  parseLine: function(position) {
    return [
      position.charCodeAt(0) - 97,
      position.charCodeAt(1) - 49,
    ];
  },

  validateRange: function(pos) {
    return pos >= 0 && pos < 8;
  },

  validatePosition: function(pos) {
    return this.validateRange(pos[0]) && this.validateRange(pos[1]);
  },

  processCase: function(input) {
    var position = this.parseLine(input);
    var moves = this.findAllValidPositions(position);
    return this.printPositions(moves);
  },

  printPositions: function(positions) {
    return positions.map(this.printPosition).join(' ');
  },

  printPosition: function(move) {
    return String.fromCharCode(move[0] + 97) + String.fromCharCode(move[1] + 49);
  },

  findAllValidPositions: function(pos) {
    var moves = this.findAllMoves(pos);
    return moves.filter(this.validatePosition.bind(this));
  },
  findAllMoves: function(pos) {
    var permutations = this.permute([-2, -1, 1, 2]);
    return permutations.map(function(permutation) {
      var newPos = pos.slice();
      newPos[0] += permutation[0];
      newPos[1] += permutation[1];
      return newPos;
    });
  },

  permute: function(arrayInput) {
    var limit = 2;
    var allPermutations = arrayInput.reduce( function perm(memo, item, i, arr) {
      var permutations = item;
      var depth = arrayInput.length - arr.length + 1;
      if (arr.length > 1 && depth < limit) {
        permutations = without(arr, i).reduce(perm, []);
        permutations = permutations.map( function(permutation) {
          return [item].concat(permutation);
        });
      }
      return memo.concat(permutations);
    },
    []);
    return allPermutations.filter( function(pos) {
      return pos[0] + pos[1] !== 0;
    });
  },
};

var moveFinder = new MoveFinder();
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
  if (line !== '') {
    console.log(moveFinder.processCase(line));
  }
});

module.exports = MoveFinder;
