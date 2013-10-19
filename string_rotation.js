var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var args = line.split(',');
		var s1 = args[0];
		var s2 = args[1];

		var idx = (s1+s1).indexOf(s2);
		var ans = idx > -1 ? 'True' : 'False';
		console.log(ans);
	}
});
