var matrix = [];
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line != ""){
		matrix.push(line.split(' ').map(function(x){return parseInt(x)}));
	}
});

function sumMatrix(i ,j, n, m){
	var sum = 0;
	for (; i < n; i++) {
		for (; j < m; j++) {
			sum +=  matrix[i][j];
		}
	}
	return sum;
}
function largestSubMatrix(i, j, n, m){
	console.log(i, j, n, m);
	var largest = sumMatrix(i, j, n, m);
	if(n < 2 || m < 2 ){ return largest };
	
	largest = Math.max(largest, largestSubMatrix(i, j, n-1, m));
	largest = Math.max(largest, largestSubMatrix(i, j, n-1, m-1));
	largest = Math.max(largest, largestSubMatrix(i, j, n, m-1));

	largest = Math.max(largest, largestSubMatrix(i, j+1, n-1, m));
	largest = Math.max(largest, largestSubMatrix(i, j+1, n-1, m-1));
	largest = Math.max(largest, largestSubMatrix(i, j+1, n, m-1));

	largest = Math.max(largest, largestSubMatrix(i+1, j, n-1, m));
	largest = Math.max(largest, largestSubMatrix(i+1, j, n-1, m-1));
	largest = Math.max(largest, largestSubMatrix(i+1, j, n, m-1));

	largest = Math.max(largest, largestSubMatrix(i+1, j+1, n-1, m));
	largest = Math.max(largest, largestSubMatrix(i+1, j+1, n-1, m-1));
	largest = Math.max(largest, largestSubMatrix(i+1, j+1, n, m-1));


	return largest;
}

var n = matrix.length;
ans = largestSubMatrix(0, 0, n, n);
console.log(ans);