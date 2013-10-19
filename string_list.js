var permute = function(alphabet, len){
	var permutations = [];
	for (var i = 0; i < alphabet.length; i++) {
		var c = alphabet[i];
		if(len > 1){
			var perms =  permute(alphabet,len-1);
			for (var j = 0; j < perms.length; j++) {
				permutations.push(c + perms[j]);
			}
		}else{
			permutations.push(c);
		}
	}
	return permutations;
}

var _sortAlphabet = function(alphabet){
    alphabet = alphabet.sort();
    var sortedAlphabet = [alphabet[0]];
    for (var i = 1; i < alphabet.length; i++) { 
        if (alphabet[i-1] !== alphabet[i]) {
            sortedAlphabet.push(alphabet[i]);
        }
    }
    return sortedAlphabet;
}

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
    	var l = line.split(',');
    	var alphabet = _sortAlphabet(l[1].split(''));
    	var n = l[0];
    	console.log(permute(alphabet, n).join(','));
    }
});