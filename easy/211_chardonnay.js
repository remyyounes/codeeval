var fs  = require("fs");
var WineMatcher = function() { };

WineMatcher.prototype = {
  processCase: function(input) {
    var parsed = this.parseLine(input);
    var matchFunc = this.contains.bind(null, parsed.letters.toLowerCase());
    return parsed.wines.filter(matchFunc);
  },
  contains: function(sub, word) {
    var result = sub.split('');
    word.toLowerCase().split('').forEach(function(letter) {
      if(letter === result[0]) result.shift();
    });
    return !result.length;
  },
  parseLine: function(line) {
    var split = line.split(' | ');
    return {
      wines: split[0].split(' '),
      letters: split[1],
    };
  },
};

// var wineMatcher = new WineMatcher();
//
// fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
//     if (line !== "") {
//       var matches = wineMatcher.processCase(line);
//       var answer = matches.length ? matches.join(" ") : "False";
//       console.log(answer);
//     }
// });

module.exports = WineMatcher;
