var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	var args = line.split(",");
	var S = args[0];
	var t = args[1];
	console.log(S.lastIndexOf(t));
});