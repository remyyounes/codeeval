var Node = function(x, y){
	this.x = x;
	this.y = y;
}

Node.prototype = {
	key: function(){return this.x + ' ' + this.y;},
	isValid: function(){
		if(visited.has(this) || addDigits(this.x) + addDigits(this.y) > 19)
			return false;
		return true;
	}
}

var NodeSet = function(){
	this._arr = [];
	this._lookUp = [];
}

NodeSet.prototype = {
	has: function(node){
		return this._lookUp[node.key()] === 1;
	},
	add: function(node){
		if(!this.has(node)){
			this._arr.push(node);
			this._lookUp[node.key()] = 1;
		}
	},
	shift: function(){
		var node = this._arr.shift();
		this._lookUp[node.key()] = 0;
		return node;

	},
	size: function(){
		return this._arr.length;
	}
};

var addDigits = function(n){
	var sum = 0;
	var digits = n.toString();
	for (var i = 0; i < digits.length; i++)
		if(digits.charAt(i) != '-')
			sum += parseInt(digits.charAt(i));
	return sum;
}

var visit = function(x,y){
	var node = new Node(x,y);
	if(node.isValid())
		toVisit.add(node);
}


var walk = function(){
	toVisit.add( new Node(0,0) );
	while(toVisit.size() > 0){
		var node = toVisit.shift();
		visited.add( node );
		visit(node.x+1, node.y);
		visit(node.x-1, node.y);
		visit(node.x, node.y+1);
		visit(node.x, node.y-1);
	}
}
var toVisit = new NodeSet();
var visited = new NodeSet();
console.time("exec time");
walk();
console.timeEnd("exec time");
console.log( visited.size() );