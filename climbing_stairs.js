var waystoClimb = function(n){
	if( n > 2 ){
		return  waystoClimb(n-1) + waystoClimb(n-2);
	}else if(n > 1){
		return 2;
	}else{
		return 1;
	}
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	console.log(waystoClimb(line));
});