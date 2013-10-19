var RomanConverter = function(){
  this.romans = { 
    'M':  1000,
    'CM': 900,
    'D':  500,
    'CD': 400,
    'C':  100,
    'XC': 90,
    'L':  50,
    'XL': 40,
    'X':  10,
    'IX': 9,
    'V':  5,
    'IV': 4,
    'I':  1
  };
};
RomanConverter.prototype = {
  convert: function(n){
    var ans = "";
    var romChar = "";
    while(n > 0) {
      romChar = this.getLargestRoman(n);
      n -= this.romans[romChar];
      ans += romChar;
    }
    return ans;
  },
  getLargestRoman: function(n){
    for (var k in this.romans) {
      if(this.romans.hasOwnProperty(k)){
        if(this.romans[k] <= n){
          return k;
        }
      }
    }
  }
};

var fs  = require("fs");
var rc = new RomanConverter();
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
      console.log( rc.convert(line) );
    }
});

module.exports.RomanConverter = RomanConverter;