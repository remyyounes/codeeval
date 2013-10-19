var nExp = 7
var counter = 0;
var n;
var lines = [];

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line != ""){
		counter++;
		if(counter==1){
			n = parseInt(line);
		}else{
			lines.push(line);
			if(lines.length >= nExp - 1){
				lines.sort(function(a,b){
					return b.length - a.length;
				});
				console.log(lines.splice(0,n).join("\n"));
			}
		}
	}
});
