var fs = require("fs");
 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
 	if(line!=""){
		var x = parseInt(line);
		var ans = '';

		while(x > 0){
			var b = x % 2;
			x = Math.floor(x / 2);
			ans = b + ans;
		}
		console.log(ans);
 	}
 }); 