var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	if(line != ""){
		var list = line.split(";");
		var a = list[0].split(",");
		var b = list[1].split(",");
		var n = a.length;
		var m = b.length;
		var ans = [];
		for(var i=0; i<n; i++){
			for(var j=0; j<m; j++){
				if(a[i] == b[j]){
					ans.push(a[i]);
					break;
				}
			}
		}
		console.log(ans.join(","));
	}
});