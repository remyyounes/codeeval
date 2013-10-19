var fs = require("fs");
 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
 	if(line!=""){
		var args = line.split(";");
		var N = args[0];
		var l = args[1].split(",");
		var ans = 0;
		var n = N-2;
		var total = n*(n+1)/2;
		for (var i = 0; i < N; i++) {
			ans += parseInt(l[i]);
		}
		ans-=total;
		console.log(ans);
	}
 }); 
