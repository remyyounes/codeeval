var BronKerbosch = function(r,p,x){
   if (p.length == 0 && x.length == 0){
   		if(r.length >= 3) console.log(r.sort().join(", "));
   	}else{
   		var pivot = choosePivot(p.concat(x));
	   	for (var i = 0; i < p.length; i++) {
   			var v = p[i];
   			if(!contains(connections[v], pivot)){
		   		p.splice(i,1);
		   		BronKerbosch(r.concat([v]) , intersect(p, connections[v]), intersect(x, connections[v]));
		   		x.push(v);
		   	}
	   	}	
   	}
}

var choosePivot = function(g){
	var p, max = -1;
	for (var i = 0; i < g.length; i++){
		var v = g[i];
		if(connections[v].length > max){
			max = connections[v].length;
			p = v;
		}
	}
	return p;
}

var contains = function(a, k) {
	for(var idx in a)
		if(a[idx] === k)
			return true;
	return false;
}

function intersect(a, b)
{
	a.sort();
	b.sort();
	var aIdx=0, bIdx=0, set = [];

	while( aIdx < a.length && bIdx < b.length )
	{
		if ( a[aIdx] < b[bIdx] ){
			aIdx++;
		}else if (a[aIdx] > b[bIdx] ){
			bIdx++;
		}else{
			set.push(a[aIdx]);
			aIdx++;
			bIdx++;
		}
	}
	return set;
}

var connections = [];
var c = [];
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	var mails = line.replace(/\s+/g, ' ').split(' ').splice(-2);
	var a = mails[0];
	var b = mails[1];

	if(!c[a]){ c[a] = []; }
	c[a].push(b);

	if(c[b] && contains(c[b],a)){
		if(!connections[a]){ connections[a] = []; }
		if(!connections[b]){ connections[b] = []; }
		connections[a].push(b);
		connections[b].push(a);
	}
});

var r = [], p = [], x = [];
for( var i in connections){ p.push(i); }
BronKerbosch(r, p.sort(), x);