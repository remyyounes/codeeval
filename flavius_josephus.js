
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var args = line.split(',');
		var n = args[0];
		var p = [];
		var m = args[1];
		var ans = [];
		var cnt = 0;

		for (var i = 0; i < n; i++) {
			p.push(i);
		};

		for (var i = 0; i < p.length; i++) {
			cnt++;
			if(cnt%m == 0){
				ans.push( p.splice(i,1) );
				i--;
			}
			if(i==p.length-1 && p.length > 0){
				i = -1;
			}
		}
		console.log(ans.join(' '));
	}
});