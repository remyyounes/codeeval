function uniques(line) 
{ 
	var list = line.split(",");
	var n = list.length;
	var prev = '';
	var ans = [];
	for(var i = 0; i<n; i++){
		if(list[i] != prev){
			ans.push(list[i]);
			prev = list[i];
		}
	}
	return ans.join(",");
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	console.log( uniques(line) );
});