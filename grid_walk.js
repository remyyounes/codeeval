var range = 298;
NodeSet = function(){
	this._arr = [];
	var arrRange = (range*2) * (range*2);
	for (var i = 0; i < arrRange; i++) {
		this._arr[i] = -1;
	};
	this.test = 0;
}

NodeSet.prototype = {
	has: function(node){
		return this._arr[node.getIndex()] !== -1;
	},
	add: function(node){
		if(!this.has(node)){
			this._arr[node.getIndex()] = 1;
			this.test++;
		}
	}
};


Node = function(x,y){
	this.x = x;
	this.y = y;
	this.valid = -1;
	this.index = -1;
}

Node.prototype = {
	toString: function(){
		return this.x + "," + this.y;
	},
	isValid: function(){
		if(this.valid === -1){
			if(visited.has(this) || addDigits(this.x) + addDigits(this.y) > 19)
				this.valid=false;
			else
				this.valid=true;
		}
		return this.valid;
	},
	getIndex: function(){
		if(this.index === -1){
			this.index = (this.x+range)*(range*2) + (this.y+range);
			// console.log(arrRange, this.index);
		}
		return this.index;
	}
}

var addDigits = function(n){
	var sum = 0;
	var digits = n.toString();
	for (var i = 0; i < digits.length; i++)
		if(digits.charAt(i) != '-')
			sum += parseInt(digits.charAt(i));
	return sum;
}


var isValid = function(node){
	if(!node.hasValidDigits() )
		return false;
	return true;
}

var visit = function(node){
	if(!visited.has(node) && node.isValid()){
		toVisit.push(node);
		// console.log(node);
	}
	visited.add(node);
}
var walk = function(){
	var ans = 0;
	toVisit.push( new Node(0,0) );
	while(toVisit.length > 0){
		ans++;
		var node = toVisit.shift();
		var x = node.x;
		var y = node.y;

		visit(new Node(x+1, y));
		visit(new Node(x-1, y));
		visit(new Node(x, y+1));
		visit(new Node(x, y-1));
	}
	return ans;
}

var toVisit = [];
var visited = new NodeSet();
// console.time("exec time");
var ans = walk();
// console.log(ans);
// console.timeEnd("exec time");
