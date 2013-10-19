var numDistinct = function (S, T) {
    var occurrences = [];
    for (var i = 0; i < T.length; i++) occurrences[i]=0;
    occurrences[T.length] = 1;

    for (var i = S.length-1; i >= 0; i--)
        for (var j = 0; j < T.length; ++j)
            occurrences[j] += (S[i]==T[j])*occurrences[j+1];
    return occurrences[0];
}

var fs = require('fs');
fs.readFileSync(process.argv[2]).toString().split('\n').forEach( function (line){
	if(line != ""){
		var l = line.split(",");
		var S = l[0];
		var T = l[1];
		console.log(numDistinct(S, T));
	}
});