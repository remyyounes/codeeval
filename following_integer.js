var followingInteger = function(n){ 
	var digits = []
	for (var i = 1; i <= 9; i++) {
		var regex = new RegExp(i, 'g');
		var count = n.match(regex); 
		if(count){
			digits[i] = count.length;
		}else{
			digits[i] = 0;
		}
	}
	var prev = parseInt(n, 10);
	var next = prev + 1;

	while(!sameList(next.toString(),digits)){
		next++;
	}
	return next;
}

var sameList = function(n, digits){
	for (var i = 1; i < digits.length; i++) {
		
		var regex = new RegExp(i, 'g');
		var count = n.match(regex); 
		if(count){
			if(digits[i] != count.length){ return false; }
		}else if(digits[i] != 0){
			return false;
		}
	}
	return true;
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	console.log(followingInteger(line));
});