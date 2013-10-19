var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		console.log(dcode(line.toString()));
	}
});

function dcode(n) 
{ 
	if( !n || n.length == 1){
		return 1;
	}
	var d = n.slice(0,2);
	if(d<=26){
		return dcode(n.slice(2)) + dcode(n.slice(1));
	}
	return dcode(n.slice(1));
}