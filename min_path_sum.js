var minPathSum = function(matrix, i, j){
	var min = parseInt(matrix[i][j]);
	if(j < matrix[i].length - 1 && i < matrix.length-1){
		min += Math.min( minPathSum(matrix, i, j+1), minPathSum(matrix, i+1, j) );
	}else if(i < matrix.length - 1){
		min += minPathSum(matrix, i+1, j);
	}else if(j < matrix[i].length - 1){
		min += minPathSum(matrix, i, j+1);
	}
	return min;
}

var mSize = 0;
var matrix;
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	if (line != "") {
		if(mSize==0){
			mSize = line;
			matrix = [];
		}else{
			var row = line.split(',');
			matrix.push(row);
			mSize--;
		}
		if(mSize == 0){
			console.log(minPathSum(matrix, 0, 0));
		}
	}
});