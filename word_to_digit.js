var wordToDigit = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var words = line.split(";");
		var digits = "";
		for (var i = 0; i < words.length; i++) 
			digits += wordToDigit.indexOf(words[i]);
		console.log(digits);
	}
});