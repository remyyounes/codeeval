var SquareSolver = function(){
	this.points = [];
};
SquareSolver.prototype = {
	isSquare: function(points){
		this.points = points;
		return this.checkDistances();
	},
	checkDistances: function(){
		var distances = [];
		distances.push( this.points[0].distanceTo(this.points[1]) );
		distances.push( this.points[1].distanceTo(this.points[2]) );
		distances.push( this.points[2].distanceTo(this.points[3]) );
		distances.push( this.points[3].distanceTo(this.points[0]) );
		distances.push( this.points[0].distanceTo(this.points[2]) );
		distances.push( this.points[1].distanceTo(this.points[3]) );

		distances.sort();
		var sides = distances.slice(0,4);
		var diagonals = distances.slice(4,6);

		var uniqueSides = sides.filter(function(itm,i,a){return i==a.indexOf(itm); });
		var uniqueDiagonals = diagonals.filter(function(itm,i,a){return i==a.indexOf(itm); });
		return uniqueDiagonals.length === 1 && uniqueSides.length === 1;
	}
}

var Node = function(x, y){
	this.x = parseInt(x);
	this.y = parseInt(y);
}

Node.prototype = {
	distanceTo: function (n){
		if(n===this) return 0;
		var a = this.x - n.x;
		var b = this.y - n.y;
		return Math.sqrt( Math.pow(a,2) + Math.pow(b,2));
	}
}

var squareSolver = new SquareSolver();
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var pString = line.split(", ");
		var points = [];
		for (var i = 0; i < pString.length; i++) {
			var p = pString[i].match(/(\d+)/g);
			points.push( new Node(p[0],p[1]) );
		};
		console.log(squareSolver.isSquare(points));
	}
});