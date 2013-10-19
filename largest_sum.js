var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line != "") {
		var l = line.split(",");
		n = l.length;
		var maxa = 0,
			ans = 0;
		for(var i=0; i<n; i++){
			var j = parseInt(l[i]);
			maxa += j;
			maxa = Math.max(maxa,j);
			ans = Math.max(maxa,ans);
		}
		console.log(ans);
	}
});