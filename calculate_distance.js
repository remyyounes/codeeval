
var Node = function(x,y){
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

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line != "") {
		var c = line.match(/[-]*\d+/g);
		var a = new Node(c[0], c[1]);
		var b = new Node(c[2], c[3]);
		console.log(a.distanceTo(b));
  }
});