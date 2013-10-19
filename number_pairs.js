var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line != "") {
		var args = line.split(";");
		var l = args[0].split(",");
		var x = parseInt(args[1]);
		var n = l.length;
		var ans = [];
		for(var i=0; i<n; i++){
			var a = parseInt(l[i]);
			for(var j=n-1; j>i; j--){
				var b = parseInt(l[j]);
				if(a + b == x ){
					ans.push(a+","+b);
					break;
				}
			}
		}
		ans = ans.length>0 ? ans.join(";") : 'NULL';
		console.log(ans);
	}
});