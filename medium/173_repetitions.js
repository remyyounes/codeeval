var fs  = require("fs");
var RepetitionKiller = function() { };

RepetitionKiller.prototype = {
  parseLine: function(line) {
    return line.split('');
  },

  processCase: function(input) {
    var phrase = this.parseLine(input);
    var noRep = [], prev = '';
    phrase.forEach(function(letter) {
      if(prev !== letter) noRep.push(letter);
      prev = letter;
    });
    return noRep.join('');
  },
};

var repetitionKiller = new RepetitionKiller();

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
      var noRep = repetitionKiller.processCase(line);
      console.log(noRep);
    }
});

module.exports = RepetitionKiller;
