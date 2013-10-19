function mthToLast(line) 
{ 
	var l = line.split(" ");
	var m = l.pop();
	var n = l.length;
	if(m > n){
		return '';
	}else{
		return l[n-m];
	}
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line != "") console.log(mthToLast(line));
});