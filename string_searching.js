//handle wild characters
var kmp_search = function(s,w){
	w = w.replace("\\*", '~');
	w = w.replace(/\*/g,'#');
	w = w.replace('~', '*');

	var lastIdx = 0;

	if(w.indexOf('#') > -1){
		//break into sub searches
		var sw = w.split("#");
		for (var i = 0; i < sw.length; i++) {
			var subAns = kmp_search_simple(s,sw[i]);

			if(subAns.length < 1){ return false; }
			
			if(lastIdx > 0){
				var found = false;
				for (var k = 0; k < subAns.length; k++) {
					if(subAns[k] > lastIdx){
						lastIdx = subAns[k];
						found = true;
						break;
					}
				}
				if(!found){ return false; }
			}
			else{
				lastIdx = subAns[0];
			}
		}
		return true;
	}else{
		return kmp_search_simple(s,w).length > 0;
	}

}

// Knuth Morris Pratt
var kmp_search_simple = function(s,w){

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


var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
    	var l = line.split(",");
    	var s = l[0];
    	var w = l[1];
    	console.log(kmp_search(s, w));
    }
});
