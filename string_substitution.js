var uniqueReplace = function(S, replacements){
	if(replacements.length <= 0) return S;
	var F = replacements[0];
	var R = replacements[1];
	var match;

	if( (match = S.match(F)) != null){
		var before = "", after = "", idx = match.index;
		if(idx > 0)					 before = uniqueReplace(S.substring(0,idx), replacements);
		if(idx < S.length - F.length)after 	= uniqueReplace(S.substring(idx+F.length), replacements);
		S = before + R + after;
	}else{
		S = uniqueReplace(S, replacements.slice(2));
	}
	return S;
}

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line != "") {
		var args =  line.split(';');
		var S = args[0];
		var replacements = args[1].split(',');
		console.log(uniqueReplace(S, replacements));
	}
});