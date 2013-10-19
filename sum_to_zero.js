var comb = function( arr, k){
	var res = [];
	for (var i = 0; i < arr.length; i++) {
		if(k == 1){
			res.push( [arr[i]] );
		}else{
			var combs = comb( arr.slice(i+1), k-1);
			for (var j = 0; j < combs.length; j++) {
				var c = combs[j];
				c.unshift( arr[i] );
				res.push(c); 
			}
		}
	}
	return res;
}

var sum = function(arr){
	var res = 0;
	for (var i = 0; i < arr.length; i++) {
		res += parseInt(arr[i]);
	}
	return res;
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var args = line.split(",");
		var combs = comb(args, 4);
		ans = 0;
		for (var i = 0; i < combs.length; i++) {
			if( sum(combs[i]) === 0){
				ans++;
			}
		}
		console.log(ans);
		
	}
});