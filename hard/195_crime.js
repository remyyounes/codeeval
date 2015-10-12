var fs  = require("fs");
var CrimeFinder = function() { };

CrimeFinder.prototype = {
  parseLine: function(line) {
    var parsed = line.split('; ');
    var events = parsed[1].split('|').map(function(event) {
      var parsedEvent = event.split(' ');
      return {
        type: parsedEvent[0],
        id: parsedEvent[1],
      };
    });
    return events;
  },

  processCase: function(input) {
    var pplCount = 0;
    var ids = {};
    var events = this.parseLine(input);
    var crimeTime = false;
    events.forEach(function(event) {
      if(event.type === 'E') {
        ids[event.id] += 1;
        if(ids[event.id] === 2) { crimeTime = true; }
      } else {
        ids[event.id] = 0;
      }
      console.log(event);
    });
    return crimeTime;
  },
};

var crimeFinder = new CrimeFinder();
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
      var crime = crimeFinder.processCase(line);
      console.log(crime);
    }
});

module.exports = CrimeFinder;
