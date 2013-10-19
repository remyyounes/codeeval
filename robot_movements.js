var n = 4;
var grid = [];
for (var i = 0; i < n; i++){
	grid[i] = [];
	for (var j = 0; j < n; j++) {
	 	grid[i][j] = 0;
	}
}

var validPaths = function(grid, i, j){
	if(grid[i][j] == 1) return 0;
	if(i == grid.length-1 && j == grid.length-1) return 1;
	grid[i][j] = 1;
	var paths = 0;
	if(i<grid.length-1)
		paths += validPaths(grid, i+1, j);
	if(i>0)
		paths += validPaths(grid, i-1, j);
	if(j<grid.length-1)
		paths += validPaths(grid, i, j+1);
	if(j>0)
		paths += validPaths(grid, i, j-1);
	grid[i][j] = 0;
	return paths;
}

console.log( validPaths(grid, 0, 0) );
