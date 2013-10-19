var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	var words = line.split(" ");
	var n = words.length;
	var ans = [];
	for(var i = n; i>0; i--){
		ans.push(words.pop());
	}
	console.log(ans.join(" "));
});
