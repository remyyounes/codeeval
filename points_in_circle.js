
var Node = function(x,y){
	this.x = x;
	this.y = y;
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
		var inside = false;
		var center = line.match(/Center\: \(([^\)]*)\)/)[1].split(", ");
		var point = line.match(/Point\: \(([^\)]*)\)/)[1].split(", ");
		var radius = line.match(/Radius\: ([^\;]*)/)[1];
		var a = new Node(point[0],point[1]);
		var b = new Node(center[0],center[1]);
		if(a.distanceTo(b) <= radius) inside = true;
		console.log(inside);
  }
});