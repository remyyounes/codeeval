function reverseGroup(line) 
{ 
	var ans = [];
	var args = line.split(';');
	var x = parseInt(args[1]);
	var l = args[0].split(',');
	var n = Math.ceil(l.length/x );

	for (var i = 0; i < n; i++) {
		var k = i*x;
		var s = l.slice(k,k+x);
		if(s.length%x==0){
			s.reverse();
		}
		for (var j = 0; j < s.length; j++) {
			ans.push(s[j]);
		};
	};
	ans = ans.join(",");
	return ans;
}


var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		console.log(reverseGroup(line));
	}
});