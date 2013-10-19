var Point = function(x, y){
	this.x = parseInt(x);
	this.y = parseInt(y);
}

Point.prototype = {
	distance: function(other){
		var dx = this.x - other.x;
		var dy = this.y - other.y;
		var distance = Math.sqrt( dx*dx + dy*dy );
		return distance;
	},toString: function(){
		return "["+this.x+","+this.y+"]";
	}
}

var closestPair = function (px, py){
	if(px.length <= 4)	return bruteForce(px);

	var middlePoint = px[Math.floor(px.length / 2) - 1];
	var qx = [];
	var rx = [];
	var qy = [];
	var ry = [];
	for (var i = 0; i < px.length; i++) {
		if(	px[i].x <= middlePoint.x)
			qx.push(px[i]);
		else
			rx.push(px[i]);
		if(	py[i].x <= middlePoint.x)
			qy.push(py[i]);
		else
			ry.push(py[i]);
	}

	if(qx.length == 0 || rx.length == 0 ){ // bad split
		var midIndex = Math.floor(px.length / 2) ;
		var q = px.slice(0, midIndex);
		var r = px.slice(midIndex);
		qx =  q.slice(0);
		qy =  q.slice(0).sort( function (a,b){ return a.y - b.y } );
		rx =  r.slice(0);
		ry =  r.slice(0).sort( function (a,b){ return a.y - b.y } );
	}

	var r1 = closestPair(qx,qy);
	var r2 = closestPair(rx,ry);
	var delta = Math.min(r1, r2);
	var r3 = closestSplitPair(px, py, delta);

	return Math.min(delta, r3);
}

var closestSplitPair = function (px, py, delta){
	var middlePoint = px[Math.floor(px.length / 2)];
	var xBar = middlePoint.x;

	var sy = [];
	for (var i = 0; i < py.length; i++)
		if(py[i].x >= xBar - delta && py[i].x <= xBar + delta)
			sy.push(py[i]);

	var min = delta;

	for (var i = 0; i < sy.length; i++) {
		var a = sy[i];
		for (var j = 1; j < 7 && j+i < sy.length; j++) {
			var b = sy[i+j];
			var distance = a.distance(b);
			if(distance < min)
				min = distance;
		}
	}
	return min;
}

var bruteForce = function(points){
	var min = Number.MAX_VALUE;
	for (var i = 0; i < points.length; i++){
		var a = points[i]
		for (var j = 0; j < points.length; j++){
			var b = points[j];
			if(i != j){
				var delta = a.distance(b);
				if(delta < min){
					min = delta;
				}
			}
		}
	}
	return min;
}

var n = 0;
var points = [];
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach( function (line){
	if(line != ""){
		if(!n){
			n = parseInt(line);
			if(n)points = [];
		}else{
			var point = line.split(' ');
			point = new Point(point[0],point[1]);
			points.push(point);
			n--;
			if(!n){
				var px = points.slice(0);
				var py = points.slice(0);
				px.sort( function (a,b){ return a.x - b.x} );
				py.sort( function (a,b){ return a.y - b.y} );
				var closest = closestPair(px, py).toFixed(4);
				var ans = closest < 10000 ? closest : "INFINITY";
				console.log(ans);
			}
		}
	}
});