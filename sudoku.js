
var checkCols = function(sol){
	for (var i = 0; i < sol.length; i++) {
		var assigned = []
		for (var j = 0; j < sol.length; j++) {
			if(assigned[sol[j][i]] != 1){
				assigned[sol[j][i]] = 1;
			}else{
				return false;
			}
		};
	};
	return true;
}

var checkRows = function(sol){
	for (var i = 0; i < sol.length; i++) {
		var assigned = [];
		for (var j = 0; j < sol.length; j++) {
			if(assigned[sol[i][j]] != 1){
				assigned[sol[i][j]] = 1;
			}else{
				return false;
			}
		};
	};
	return true;
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var args = line.split(';');
		var N = args[0];
		var s = args[1].split(',');
		var i =0;
		var sol = [];
		for (var i = 0; i < N; i++) {
			sol.push(s.splice(0,N));
		};
		var ans = checkCols(sol) && checkRows(sol);
		ans = ans?'True':'False';
		console.log(ans);
	}
});