function mod(n,m) 
{
	var x = Math.floor(n/m);
	return n - x*m;
}


var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line != ""){
		var l = line.split(",");
		var n = l[0];
		var m = l[1];
		console.log(mod(n,m));
	}
});
