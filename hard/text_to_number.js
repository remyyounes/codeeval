var TextReader = function(){
  this.englishNums = {
    'negative': -1,
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 1,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90,
    'hundred': 100,
    'thousand': 1000,
    'million': 1000000
  }
  this.special = {
    'negative': 1,
    'thousand': 1,
    'million': 1
  }
};

TextReader.prototype = {
  isSpecial: function(txt){
    return this.special[txt] > 0;
  },
  toNumber: function(txt){
    var digits = txt.split(" ");
    
    var num = 0;
    var phases = [];
    var currentSum = 0;

    for (var i = digits.length - 1; i >= 0; i--) {
      var d = this.wordToDigit(digits[i]);
      if(isSpecial) 
      if(digits[i])
      console.log(d);
      phases.push(currentSum);
    };
    phases.push(currentSum);
    return num;
  },
  wordToDigit: function(word){
    var digit = this.englishNums[word];
    return digit;
  }
};

var tR = new TextReader();
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
  if (line !== "") {
    console.log(tR.toNumber(line));
  }
});

module.exports.TextReader = TextReader;



// fifteen
// negative six hundred thirty eight
// zero
// two million 
// one hundred 
// seven


// three millions four hundred fourty five thousand seven hundred ninety four


// 4
// 90
// 700

// 5
// 40
// 400
// x 1000

// 3
// x 1000000
