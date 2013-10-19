var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	var l = line.split(",");
	var x = parseInt(l[0]);
	var n = parseInt(l[1]);
	var ans = n;
	while(x > ans){
		ans += n;
	}
	console.log(ans);
});