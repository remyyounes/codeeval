var addDigits = function(n){
	var sum = 0;
	var digits = Math.abs(n).toString();
	for (var i = 0; i < digits.length; i++)
		sum += parseInt(digits[i]);
	return sum;
}

var range = 298;
var absRange = range*2;
var ans = 0;
for (var i = 0; i <= absRange; i++) {
	for (var j = 0; j <= absRange; j++) {
		if(addDigits(i-range) + addDigits(j-range) <= 19){
			// console.log(i-range, j-range);
			ans++;
		}
	}
}

console.log(ans);
