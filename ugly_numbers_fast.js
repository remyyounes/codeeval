var permuteOperations = function(digits){
	var permutations = [];
	if(digits.length == 1){	
		permutations.push(parseInt(digits,10));
	}else if(digits.length > 1){
		for (var i = 1; i <= digits.length; i++) {
			var n = digits.substring(0,i);
			n = parseInt(n, 10);
			var subdigits = digits.substring(i);
			var perms = permuteOperations(subdigits);
			if(perms.length){
				for (var j = 0; j < perms.length; j++) {
					permutations.push( n + perms[j]);
					permutations.push( n - perms[j]);
				}
			}else{
				permutations.push(n);
			}
		}
	}
	return permutations;
}

var isUgly = function(n){
	return ( 
		n % 2 == 0 
	||	n % 3 == 0
	||	n % 5 == 0
	||	n % 7 == 0
	)
}

var fs = require('fs');

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	var operations = permuteOperations(line);
	var ans = 0;
	for (var i = 0; i < operations.length; i++) {
		if( isUgly(operations[i]) ) ans++;
	}
	console.log(ans);
});