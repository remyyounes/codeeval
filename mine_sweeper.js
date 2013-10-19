
var Cell = function(x,y,v){
	this.x = x;
	this.y = y;
	this.value = (v != '*') ? 0 : '*';
}

Cell.prototype = {
	addDanger: function(){
		if(this.value != "*") this.value++;
	}
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

	getAdjacentCells: function (cell){
		var adj = [];
		var sx = (cell.x > 0) ? cell.x-1 : cell.x;
		var ex = (cell.x < this.matrix.length - 1) ? cell.x+1 : cell.x;
		var sy = (cell.y > 0) ? cell.y-1 : cell.y;
		var ey = (cell.y < this.matrix[0].length - 1) ? cell.y+1 : cell.y;
		for (var i = sx; i <= ex; i++) 
			for (var j = sy; j <= ey; j++) 
				adj.push(this.matrix[i][j]);
		return adj;
	},
	incrementAdjacentDanger: function( cell) {
		if(cell.value != "*") return;
		var adj = this.getAdjacentCells(cell);
		for (var i = 0; i < adj.length; i++)
			adj[i].addDanger();
	},

	getMines: function (){
		var mines = [];
		for (var i = 0; i < this.matrix.length; i++) 
			for (var j = 0; j < this.matrix[i].length; j++) 
				if(this.matrix[i][j].value == '*') mines.push(this.matrix[i][j]);
		return mines;
	},
	computeDanger: function(){
		var mines = this.getMines();
		for (var i = 0; i < mines.length; i++)
			this.incrementAdjacentDanger(mines[i]);
	},
	printSolution: function(){
		var solution = "";
		for (var i = 0; i < this.matrix.length; i++) 
			for (var j = 0; j < this.matrix[i].length; j++)
				solution += this.matrix[i][j].value;
		console.log(solution);
	}
}

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (fieldData) {
	if (fieldData != "") {
		var f = fieldData.split(';');
		var dimensions = f[0].split(',')
		var cells = f[1].split('');
		var m = [];
		while(cells.length > 0)
			m.push(cells.splice(0,dimensions[1]));
		
		var field = new Matrix(m);
		field.computeDanger();
		field.printSolution();
	}
});