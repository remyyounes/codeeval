var sum = 0,
	i = 0,
	iMax = 7;

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	sum+=parseInt(line);
	i++;
	if(i >= iMax){
		console.log(sum);
		return;
	}
});
