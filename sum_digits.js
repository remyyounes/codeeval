var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	var ans = 0;
	while(line > 0){
		ans += line%10;
		line = Math.floor(line/10);
	}
	console.log(ans);
});