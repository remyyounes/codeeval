var Set = function(){
	this._arr = [];
	this._lookUp = [];
}
Set.prototype = {
	has: function(cell){
		return this._lookUp[cell.key()] === 1;
	},
	add: function(cell){
		if(!this.has(cell)){
			this._arr.push(cell);
			this._lookUp[cell.key()] = 1;
		}
	},
	shift: function(){
		var cell = this._arr.shift();
		this._lookUp[cell.key()] = 0;
		return cell;

	},
	size: function(){
		return this._arr.length;
	}
};


var Cell = function(x,y,v){
	this.x = x;
	this.y = y;
	this.value = v;
}
Cell.prototype = {
	key: function(){return this.x + ' ' + this.y;}
}


var Matrix = function(matrix){
	this.matrix = [];
	for (var i = 0; i < matrix.length; i++) {
		this.matrix[i] = [];
		for (var j = 0; j < matrix[i].length; j++) {
			this.matrix[i][j] = new Cell(i,j,matrix[i][j]);
		}
	}
}

Matrix.prototype = {
	has: function(word){
		var visitedCells = new Set();
    	var startCells = this.getStartCells(word);
    	var matched = false;
    	while(startCells.length > 0 & !matched){
    		var cell = startCells.shift();
    		matched = this.isMatch(cell, word, visitedCells);
    	}
    	return matched;
	},
	isMatch: function( cell, word, visitedCells ){
		if(cell.value != word.charAt(0)) return false;
		if(visitedCells.has(cell)) return false;
		if(word.length == 1) return true;
		visitedCells.add(cell);
		var match = false;
		if(!match && cell.x > 0) 
			match = this.isMatch(this.getTop(cell), word.substring(1), visitedCells);
		if(!match && cell.y > 0) 
			match = this.isMatch(this.getLeft(cell), word.substring(1), visitedCells);
		if(!match && cell.x < this.matrix.length - 1) 
			match = this.isMatch(this.getBottom(cell), word.substring(1), visitedCells);
		if(!match && cell.y < this.matrix[0].length - 1) 
			match = this.isMatch(this.getRight(cell), word.substring(1), visitedCells);
		return match;
	},
	getTop: function (cell){
		return this.matrix[cell.x-1][cell.y];
	},
	getRight: function (cell){
		return this.matrix[cell.x][cell.y+1];
	},
	getBottom: function (cell){
		return this.matrix[cell.x+1][cell.y];
	},
	getLeft: function (cell){
		return this.matrix[cell.x][cell.y-1];
	},
	getStartCells: function(word){
		var cells = [];
		var  l = word.charAt(0);
		for (var i = 0; i < this.matrix.length; i++){
			for (var j = 0; j < this.matrix[i].length; j++) {
				var cell = this.matrix[i][j];	
				if(cell.value == l){
					cells.push(cell);
				}
			}
		}
		return cells;
	}
}

var board = new Matrix(
	[
		['A','B','C','E'],
		['S','F','C','S'],
		['A','D','E','E']
	]
);

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (word) {
    if (word != "") {
    	console.log(board.has(word) ? "True":"False" );
    }
});