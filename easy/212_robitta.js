var fs  = require("fs");
var PathFinder = function() { };

PathFinder.prototype = {
  parseLine: function(line) {
    var input = line.split(' | ');
    var dimensions = input[0].split('x');
    var robitta = input[1].split(' ');
    robitta[1] = dimensions[1] - robitta[1];
    robitta[0] = robitta[0] - 1;
    return {
      map: this.createMap(dimensions),
      dimensions: dimensions,
      robitta: robitta,
      position: [0, 0],
      direction: 'right',
      nuts: 0,
      found: false,
    };
  },
  createMap: function(dimensions) {
    var map = [];
    for (var i = 0; i < dimensions[0]; i++) {
      map[i] = [];
      for (var j = 0; j < dimensions[1]; j++) {
        map[i][j] = 1;
      }
    }
    return map;
  },
  nextCell: function(position, direction) {
    var cell = [position[0], position[1]];
    if(direction === 'right') {
      cell[0] += 1;
    }else if(direction === 'bottom') {
      cell[1] += 1;
    } else if(direction === 'left') {
      cell[0] -= 1;
    } else if(direction === 'top') {
      cell[1] -= 1;
    }
    return cell;
  },
  inBoundsAndNew: function(map, position) {
    var x = position[0];
    var y = position[1];
    var row = map[x];
    var cell = row && row[y];
    if ( cell === 1) {
      map[x][y] = 0;
      return true;
    }
    return false;
  },
  nextDirection: function(direction) {
    if (direction === 'right') {
      return 'bottom';
    } else if (direction === 'bottom') {
      return 'left';
    } else if (direction === 'left') {
      return 'top';
    } else if (direction === 'top') {
      return 'right';
    }
  },
  removeNut: function(map, position) {
    map[position[0]][position[1]] = 0;
    return map;
  },
  foundRobitta: function(robitta, position) {
    var found = false;
    if(  position[0] === robitta[0] &&
      position[1] === robitta[1] ) {
      found = true;
    }
    return found;
  },
  nextPosition: function(map, position, direction) {
    var nextDirection = direction;
    var nextPosition = this.nextCell(position, direction);
    if ( !this.inBoundsAndNew(map, nextPosition) ){
      nextDirection = this.nextDirection(direction);
      nextPosition = this.nextCell(position, nextDirection);
    }
    return {
      position: nextPosition,
      direction: nextDirection,
    };
  },
  nextState: function(state) {
    state.found = this.foundRobitta(state.robitta, state.position);
    state.map = this.removeNut(state.map, state.position);
    state.nuts++;
    var newMove = this.nextPosition(state.map, state.position, state.direction);
    state.position = newMove.position;
    state.direction = newMove.direction;
    return state;
  },
  processCase: function(input) {
    var state = this.parseLine(input);
    while((state = this.nextState(state)).found === false) { }
    return state.nuts;
  },
};

var pathFinder = new PathFinder();

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
      var nuts = pathFinder.processCase(line);
      console.log(nuts);
    }
});

module.exports = PathFinder;
