function happy(line) 
{ 	
	var n = parseInt(line);
	var prev = [];
	while(n > 1){
		var s = n.toString();
		n = 0;
		for(var i=0;i<s.length; i++){
			var p = parseInt(s[i]);
			n+= p*p;
		}
		if(prev.indexOf(n) == -1){
			prev.push(n);
		}else{
			return 0;
		}
	}
	return n;
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line != "") console.log(happy(line));
});