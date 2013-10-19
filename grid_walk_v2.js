var range = 298;

var NodeSet = function(){
	this._arr = [];
	for (var i = 0; i < range*2; i++) {
		this._arr[i] = [];
		for (var j = 0; j < range*2; j++) {
			this._arr[i][j]=0;
		}
	}
}

NodeSet.prototype = {
	has: function(node){
		var x = node[0]+range;
		var y = node[1]+range;
		console.log(x, this._arr[x]);
		return this._arr[x][y] === 1;
	},
	add: function(node){
		if(!this.has(node)){
			this._arr[node[0]+range][node[1]+range] = node;
		}
	},
	pop: function(){
		var node = this._arr.pop();
		return node;

	},
	size: function(){
		return this._arr.length;
	}
};


var visit = function(x, y){
	if(isValid(x, y))
		toVisit.add([x, y]);
}

var isValid = function(x,y){
	if(visited.has([x,y]) || addDigits(x) + addDigits(y) > 19)
		return false;
	return true;
}

var addDigits = function(n){
	var sum = 0;
	var digits = n.toString();//.split('');
	for (var i = 0; i < digits.length; i++)
		if(digits.charAt(i) != '-')
			sum += parseInt(digits.charAt(i));
	return sum;
}

var walk = function(){
	toVisit.add( [0,0] );
	while(toVisit.size() > 0){
		var node = toVisit.pop();
		var x = node[0];
		var y = node[1];

		visited.add( [x, y] );
		
		visit(x+1, y);
		visit(x-1, y);
		visit(x, y+1);
		visit(x, y-1);
	}
}
var toVisit = new NodeSet();
var visited = new NodeSet();
console.time("exec time");
walk();
console.timeEnd("exec time");
console.log( visited.size() );
