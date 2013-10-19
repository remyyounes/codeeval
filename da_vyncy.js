
var overlapLength = function (text1, text2){
	var x = Math.min(text1.length, text2.length);
	while (x > 0){
		if (text1.substring(0,x) == text2.substring(text2.length-x))
			break
		x--;
	}
	return x;
}

var getBestOverLap = function(fragments){
	var bestOverLap = { "overlap": 0 };
	for (var i = 0; i < fragments.length; i++) {
		var a = fragments[i];
		for (var j = i+1; j < fragments.length; j++) {
			var b = fragments[j];
			var maxA = overlapLength(a,b);
			var maxB = overlapLength(b,a);

			if(maxA > bestOverLap.overlap) {
				bestOverLap.overlap = maxA;
				bestOverLap.a = a;
				bestOverLap.b = b;
			}

			if(maxB > bestOverLap.overlap) {
				bestOverLap.overlap = maxB;
				bestOverLap.a = b;
				bestOverLap.b = a;
			}
		}
	}
	return bestOverLap;
}

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line != "") {
		var fragments = line.split(';');
		while(fragments.length > 1){
			var bestOverLap = getBestOverLap(fragments);
			if(!bestOverLap.overlap) break;

			var a = bestOverLap.a;
			var b = bestOverLap.b;
			var merged = b + a.substring(bestOverLap.overlap);
			fragments.splice( fragments.indexOf(a), 1);
			fragments.splice( fragments.indexOf(b), 1);
			fragments.push(merged);
		}
		fragments.sort(function(a,b){return b.length-a.length})
		console.log(fragments[0]);
	}
});
