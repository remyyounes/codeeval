var getLongestRepeated = function(s){
	var mSize = parseInt(s.length / 2);
	var rIdx = rOffset = i = j = 0;
	var longest = -1;
	for (i = 0; i < s.length; i++) {
		for (j = rOffset+1; j <= mSize && i+j < s.length; j++) {
			var t = s.substring(i,i+j);
			if( s.indexOf(t ,i+j) < 0 ) break;
			if(t != " " && t.length > longest){
				longest = t.length;	
				rIdx = i;
				rOffset = j;
			}
		}
	}
	return longest > -1 ? s.substring(rIdx,  rIdx + rOffset) : "NONE";
}

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line != "") {
		console.log( getLongestRepeated(line))
	}
});
