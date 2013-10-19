var findMin = function(n, k, a, b, c, r){
	var m = [a];
	for (var i = 1; i < n; i++) {
		if(i < k){
			m[i] = (b * m[i - 1] + c) % r;
		}else{
			m[i] = getSmallest(m.slice(i-k, i));
		}
	}
	return m[n-1];
}

var getSmallest = function ( arr ){
	arr.sort(function(a,b){return a - b});
	var smallest = 0, i = 0;
	while(arr[i] == smallest){
		while(arr[i] == smallest) i++;
		smallest++;
	}
	return smallest;
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	if (line != "") {
		var args = line.split(',');
		for (var i = 0; i < args.length; i++) {	args[i] = parseInt(args[i]); };
		var ans = findMin(args[0], args[1], args[2], args[3], args[4], args[5]);
		console.log(ans);
	}
});