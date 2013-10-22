var matrix = [];
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	if(line != ""){
		matrix.push(line.split(' ').map(function(x){return parseInt(x);}));
	}
});

function largestSubSum(arr){
	var maxSum = 0;
	var tempSum = 0;
	for (var i = 0; i < arr.length; i++) {
		if(tempSum + arr[i] > 0){
			tempSum += arr[i];
			maxSum = Math.max(maxSum, tempSum);
		}
	}
	return maxSum;
}

function largestSubMatrixSum(matrix){
	var maxSum = 0;
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix.length; j++) {
			var tempSums = [];
			for (var k = 0; k < matrix[0].length; k++) {
				tempSums[k] = 0;
				for (var l = i; l <= j; l++) {
					tempSums[k] += matrix[l][k];
				}
			}
			var tempLargest = largestSubSum(tempSums);
			maxSum = Math.max(maxSum, tempLargest);
		}
	}
	return maxSum;
}

console.log(largestSubMatrixSum(matrix));