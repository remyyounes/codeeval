const fs = require('fs');
var WineMatcher = function() { };

WineMatcher.prototype = {
  processCase: function(input) {
    var parsed = this.parseLine(input);
    var matchFunc = this.contains.bind(null, parsed.letters.toLowerCase());
    return parsed.wines.filter(matchFunc);
  },
  contains: function(sub, word) {
    var result = true;
    sub.split('').forEach( l => {
      const idx = word.indexOf(l);
      if ( idx > -1 ) {
        word = word.slice(0, idx) + word.slice(idx + 1);
      } else {
        result = false;
      }
    });
    return result;
  },
  parseLine: function(line) {
    var split = line.split(' | ');
    return {
      wines: split[0].split(' '),
      letters: split[1],
    };
  },
};

const wineMatcher = new WineMatcher();

fs.readFileSync(process.argv[2]).toString().split('\n').forEach((line) => {
  if (line !== '') {
    const matches = wineMatcher.processCase(line);
    const answer = matches.length ? matches.join(' ') : 'False';
    console.log(answer);
  }
});

module.exports = WineMatcher;
