var isPrime = function(n){
	for(var c=2; c <n; c++){
		if( n%c == 0){
			return false;
		} 
	}
	return true;
}
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var args = line.split(",");
		var N = parseInt(args[0]);
		var M = parseInt(args[1]);
		var ans = [];
		for(var i=N; i <= M; i++){
			if(isPrime(i)){
				ans.push(i);
			}
		}
		console.log(ans.length);
	}
});
