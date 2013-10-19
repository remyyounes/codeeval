var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
		if(line != ""){
		var b = parseInt(line).toString(2);
		var n = b.length;
		var ans = 0;
		for(var i=0; i<n; i++){
			if(b[i] === '1'){
				ans++;
			}
		}
		console.log(ans);
	}
});