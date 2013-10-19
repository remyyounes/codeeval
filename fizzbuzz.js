var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	if (line != "") {
		var l = line.split(" ");
		var f = l[0],
			b = l[1],
			n = l[2],
			fb = l[0]*l[1],
			ans = [];
		for(var i=1; i<=n; i++){
			if(i % fb == 0){
				ans.push('FB');
			}else if(i % f == 0){
				ans.push('F');
			}else if(i % b == 0){
				ans.push('B');
			}else{
				ans.push(i);
			}
			ans[i];
		}
		console.log( ans.join(" ") );
	}
});
