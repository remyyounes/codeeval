var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line != "") {
		var l = line.split(",");
		var s = l[0];
		var e = l[1];
		var n = s.length;
		var m = e.length;
		var r = s.indexOf(e);
		var ans = 0;

		if( r == n-m && n>=m){
			ans=1;
		}
		console.log(ans);
	}
});