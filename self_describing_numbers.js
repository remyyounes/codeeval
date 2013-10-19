function selfDescribingNumber(line) 
{ 	
	var l = parseInt(line);
	var s = l.toString();
	var n = s.length;
	for(var i=0;i<n; i++){
		var curr = parseInt(s[i]);
		for(var j=0; j<n; j++){
			if(s[j] == i){
				curr--;
			}
		}
		if(curr!=0){
			return 0;
		}
	}
	return 1;
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line != ""){
		console.log(selfDescribingNumber(line));
	}
});