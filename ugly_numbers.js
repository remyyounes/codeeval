var permuteOperations = function(digits){
	var operations = ['','+','-'];
	var permutations = [];
	if(digits.length>1){
		for (var i = 0; i < operations.length; i++) {
			var perms = permuteOperations(digits.substring(1));
			for (var j = 0; j < perms.length; j++) {
				permutations.push(digits[0] + operations[i]+ perms[j]);
			}
		}
	}else{
		permutations.push(digits[0]);
	}
	return permutations;
}

var computeOperations = function(operations) {
	var results = [];
	for (var i = 0; i < operations.length; i++) {
		results.push( compute(operations[i]) );
	}
	return results;
}

var compute = function(operation){
	var sums = operation.split('+');
	var sumRes = 0;
	for (var i = 0; i < sums.length; i++) {
		var subs = sums[i].split('-');
		var subRes = parseInt(subs[0],10);
		if(subs.length>1){
			for (var j = 1; j < subs.length; j++) {
				subRes -= parseInt(subs[j]);
			}
		}
		sumRes+=parseInt(subRes,10);
	};
	return sumRes;
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
	var results = computeOperations(operations);
	var ans = 0;
	for (var i = 0; i < results.length; i++) {
		if( isUgly(results[i]) ) ans++;
	}
	console.log(ans);
});