var palindrome = function(x){
	x = x.toString();
	for (var i = 0, j = x.length-1; i < x.length, i<=j; i++, j--) {
		if(x[i] != x[j]){
			return false;
		}
	};
return true;
}

var reverseInt = function(x){
	x = x.toString();
	var y =  x.split("").reverse().join("");
	return parseInt(y, 10);
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var x = parseInt(line);
		var i = 0;

		while(!palindrome(x)){
			x += reverseInt(x);
			i++;
		}
		console.log(i + ' ' + x);
	}
});
