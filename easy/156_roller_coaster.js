var isLetter = function(letter) {
  letter = letter.toLowerCase();
  return letter <= 'z' && letter >= 'a';
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
  if(line !== "") {
    var upperCase = true;
    line = line.split("");
    for (var i = 0; i < line.length; i++) {
      if( isLetter(line[i]) ){
        line[i] = upperCase ? line[i].toUpperCase() : line[i].toLowerCase();
        upperCase = !upperCase;
      }
    }
    console.log(line.join(""));
  }
});
