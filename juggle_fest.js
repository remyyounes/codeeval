var codeevalCi = 1970;
var numC = 2000;
var numJ = 12000;
var jpc = numJ/numC;
var cs = [];
var js = [];
var assignments = [];


var vProd = function(c, j){
	return c['H'] * j['H'] + c['E'] * j['E'] + c['P'] * j['P'] ;
}

var matchScore = function(ci, j){
	return vProd(cs[ci], j);
}

var assignJuggler = function(j, ci){
	if(!assignments[ci].length){
		assignments[ci].push(j);
	}else{
		var msj = matchScore(ci, j);
		for (var i = 0; i < assignments[ci].length; i++) {
			if( msj > matchScore(ci, assignments[ci][i]) ){
				 assignments[ci].splice(i, 0, j);
				 break;
			}else if(i == assignments[ci].length-1){
				assignments[ci].push(j);
				break;
			}
		};
	}
}

var findCircuit = function(j){
	var choices = j['C'];
	for (var i = 0; i < choices.length; i++) {
		var ci = parseInt(choices[i].slice(1));
		if(!assignments[ci]){
			assignments[ci] = [];
		}
		if(assignments[ci].length < jpc){
			assignJuggler(j,ci);
			return;
		}else{
			var mj = leastJuggler(ci);
			if( matchScore(ci,j) > matchScore(ci, mj)){
				assignments[ci].pop();
				assignJuggler(j,ci);
				findCircuit(mj);
				return;
			}
		}
	};
}

var leastJuggler = function(ci){
	return assignments[ci][assignments[ci].length-1];
}

var addJugglerNames = function (ci){
	var sum = 0;
	for (var i = 0; i < assignments[ci].length; i++) {
		sum += parseInt( assignments[ci][i]['N'] );
	};
	return sum;
}


var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var args = line.split(" ");
		var type = args.shift();
		if(type=='C'){
			var c = [];
			c['N'] = args[0].slice(1);
			c['H'] = args[1].split(':')[1];
			c['E'] = args[2].split(':')[1];
			c['P'] = args[3].split(':')[1];
			cs.push(c);
		}else if(type=='J'){
			var j = [];
			j['N'] = args[0].slice(1);
			j['H'] = args[1].split(':')[1];
			j['E'] = args[2].split(':')[1];
			j['P'] = args[3].split(':')[1];
			j['C'] = args[4].split(',');
			js.push(j);
		}


		if(js.length == numJ){
			for (var i = 0; i < js.length; i++) {
				findCircuit(js[i]);
			};

			console.log(addJugglerNames(codeevalCi));
		}
	}
});
