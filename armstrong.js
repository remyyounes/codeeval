var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line != ""){
		var l = line.toString();
		var n = l.length;
		var t = 0;
		for(var i=0; i<n; i++){
			t+= Math.pow( parseInt(l[i]), n);
		}
		console.log(t == line ? "True":"False");
	}
});