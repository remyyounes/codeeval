var SentenceExaminer = function(){};

SentenceExaminer.prototype = {
  getLongestWord: function(s){
    var words = s.split(" ");
    var longestWord = words[0];
    for (var i = 1; i < words.length; i++) {
      if( longestWord.length < words[i].length ){
        longestWord = words[i];
      }
    };
    return longestWord;
  }
};

var se = new SentenceExaminer();
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
  if (line !== "") {
    console.log(se.getLongestWord(line));
  }
});

module.exports.SentenceExaminer = SentenceExaminer;