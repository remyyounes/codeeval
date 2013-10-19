var numC = 3;
var numJ = 12;
var jpc = numJ/numC;
var mm = [];
var cs = [];
var js = [];
var assignments = [];

var printMatrix = function(mx){
	for(var i=0; i<mx.length; i++){
		console.log( mx[i].join("\t") );
	}
	console.log("\n");
}

var printAssignments = function(){
	var out = "";
	for (var i = 0; i < assignments.length; i++) {
		if(assignments[i]){
			out += "C"+i;
			for (var j = 0; j < assignments[i].length; j++) {
			
				out += "\t" + "J" + assignments[i][j]['N'];
			};
		out += "\n";
		}
	};
	console.log(out);
}

var vProd = function(c, j){
	return c['H'] * j['H'] + c['E'] * j['E'] + c['P'] * j['P'] ;
}

var matchMatrix = function(cs, js){
	var mm = [];
	for (var i = 0; i < cs.length; i++) {
		mm[i] = [];
		for (var j = 0; j < js.length; j++) {
			mm[i][j] = vProd(cs[i],js[j]);
		};
	};
	return mm;
}

var matchScore = function(ci, j){
	var ji = j['N'];
	return mm[ci][ji];
}

var assignJuggler = function(j, ci){
	var as = assignments[ci];
	if(!as.length){
		as.push(j);
	}else{
		for (var i = 0; i < as.length; i++) {
			if( matchScore(ci, j) > matchScore(ci, as[i]) ){
				 as.splice(i, 0, j);
				 break;
			}else if(i == as.length-1){
				as.push(j);
				break;
			}
		};
	}
	assignments[ci] = as;
}

var findCircuit = function(j){
	
	console.log("assigning J"+j['N']);
	printAssignments();
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
			//if j is a better match then assign
			if( matchScore(ci,j) > matchScore(ci, mj)){
				console.log('=========================');
				printAssignments();
				assignments[ci].pop();
				printAssignments();
				console.log('=========================');
				//now find a place for moved juggler
				console.log("Removed J"+mj['N'] + " in C"+ci );
				assignJuggler(j,ci);
				
				findCircuit(mj);
				return;
			}
		}
	};
	// if ci still has room, add to list
	// else find smallest in ci 
	// if our score is bigger than smallest then assign to this circuit and 

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

function codeEvalExecute(line) 
{ 
	var args = line.split(" ");
	var type = args.shift();
	//c
	if(type=='C'){
		var c = [];
		c['N'] = args[0].slice(1);
		c['H'] = args[1].split(':')[1];
		c['E'] = args[2].split(':')[1];
		c['P'] = args[3].split(':')[1];
		cs.push(c);
	}else if(type=='J'){
		var j = [];
		console.log(args.join('/'));
		j['N'] = args[0].slice(1);
		j['H'] = args[1].split(':')[1];
		j['E'] = args[2].split(':')[1];
		j['P'] = args[3].split(':')[1];
		j['C'] = args[4].split(',');
		js.push(j);
	}

	var ans;

	if(js.length == numJ){
		mm = matchMatrix(cs, js);
		printMatrix(mm);
		for (var i = 0; i < js.length; i++) {
			findCircuit(js[i]);
		};
		printAssignments();

		var codeevalCi = 1;
		ans = addJugglerNames(codeevalCi);
	}
	if(ans){
		console.log("\n==================\n" + ans + "\n==================\n");
	}
	return ans;
}

codeEvalExecute("C C0 H:7 E:7 P:10");
codeEvalExecute("C C1 H:2 E:1 P:1");
codeEvalExecute("C C2 H:7 E:6 P:4");

codeEvalExecute("J J0 H:3 E:9 P:2 C2,C0,C1");
codeEvalExecute("J J1 H:4 E:3 P:7 C0,C2,C1");
codeEvalExecute("J J2 H:4 E:0 P:10 C0,C2,C1");
codeEvalExecute("J J3 H:10 E:3 P:8 C2,C0,C1");
codeEvalExecute("J J4 H:6 E:10 P:1 C0,C2,C1");
codeEvalExecute("J J5 H:6 E:7 P:7 C0,C2,C1");
codeEvalExecute("J J6 H:8 E:6 P:9 C2,C1,C0");
codeEvalExecute("J J7 H:7 E:1 P:5 C2,C1,C0");
codeEvalExecute("J J8 H:8 E:2 P:3 C1,C0,C2");
codeEvalExecute("J J9 H:10 E:2 P:1 C1,C2,C0");
codeEvalExecute("J J10 H:6 E:4 P:5 C0,C2,C1");
codeEvalExecute("J J11 H:8 E:4 P:7 C0,C1,C2");
