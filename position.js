var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	var l = line.split(",");
	var n = parseInt(l[0]),
		p1 = parseInt(l[1]) - 1,
		p2 = parseInt(l[2]) - 1;
	var a1 = n >> p1,
		a2 = n >> p2;
	var ans = (a1&1) == (a2&1);

	console.log(ans.toString().toLowerCase());
});