var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line != "") {
		var n=line.length;
		var c = [];
		for(var i=0; i<n; i++){
			var j = line.charCodeAt(i);
			if(c[j] != undefined){
				c[j]++;
			}else{
				c[j]=1;
			}
		}

		for(var i=0; i<n; i++){
			var j = line.charCodeAt(i);
			if(c[j] === 1){
				console.log(line[i]);
				return;
			}
		}
	}
});