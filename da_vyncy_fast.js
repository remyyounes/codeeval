
// Knuth Morris Pratt
var kmp_search = function(s,w){

	var t = kmp_table(w);
	var ans = [];
	var i = 0,j = 0, k = 0;

	while( s.length-k >= w.length){
		while(j<=w.length && s[i] == w[j]){
			i++;
			j++;
		}
		if (j >= w.length){
			ans.push(k);
		}
		if(t[j-1] > 0){
			k = i - t[j-1];
		}else{
			if(i == k){
				i++;
			}
			k = i;
		}
		if( j > 0 ){
			j = t[j - 1];
		}
	}
	return ans;
}

var kmp_table = function(w){
	var t = [0];
	for(var i=1; i<w.length; i++){
		var c = w[i];
		var m = t[i-1];
		while( w[m] != c && m != 0){
			m = t[m-1];
		}
		t[i] = (w[m] == c) ? m+1 : 0;
	}
	return t;
}



var commonOverlapNaive = function (text1, text2){
	var x = Math.min(text1.length, text2.length);
	while (x > 0){
		if (text1.substring(0,x) == text2.substring(text2.length-x)){
			break
		}
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
			var maxA = commonOverlapNaive(a,b);
			var maxB = commonOverlapNaive(b,a);

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

			var a = bestOverLap.a;
			var b = bestOverLap.b;
			var merged = b + a.substring(bestOverLap.overlap);

			fragments.splice( fragments.indexOf(a), 1);
			fragments.splice( fragments.indexOf(b), 1);
			fragments.push(merged);
		}
		console.log(fragments[0]);
	}
});
