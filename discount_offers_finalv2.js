var coveredCols = [];
var coveredRows = [];
var starsPrimes = [];
var primeSeries = [];
var starSeries = [];
var matrix = [];
var currentPrime = [];

var init = function(){
	coveredCols = [];
	coveredRows = [];
	starsPrimes = [];

	initCovered();
	initStarsAndPrimes();
}

var initStarsAndPrimes = function (){
	for (var i = 0; i < matrix.length; i++) {
		starsPrimes[i] = [];
		for (var j = 0; j < matrix.length; j++) {
			starsPrimes[i][j]=0;
			starsPrimes[i][j]=0;
		}
	}
}

var initCovered = function(){
	for (var i = 0; i < matrix.length; i++) {
		coveredRows[i] = 0 ;
		coveredCols[i] = 0 ;
	}
}

var step5Cleanup = function(){
	initCovered();
	
	//remove primes
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix.length; j++) {
			if(starsPrimes[i][j]==2){
				starsPrimes[i][j]=0;
			}
		}
	}

	for (var i = 0; i < starSeries.length; i++) {
		starsPrimes[starSeries[i][0]][starSeries[i][1]] = 0;
	}

	for (var i = 0; i < primeSeries.length; i++) {
		starsPrimes[primeSeries[i][0]][primeSeries[i][1]] = 1;
	}

	primeSeries = [];
	starSeries = [];
}



var discountMatrix = function(cs, ps){
	var n = Math.max(cs.length, ps.length);
	for(var i=0; i<n; i++){
		matrix[i] = [];
		for(var j=0; j<n; j++){
			if(i < cs.length && j < ps.length){
				matrix[i][j] = getSS(cs[i], ps[j]);
			}else{
				matrix[i][j] = 1000;
			}
		}
	}

	return matrix;
}

var getSS = function(c,p){
	var ss = 0;
	var pl = p.match(/[a-z]{1}/g).length;
	var cl = c.match(/[a-z]{1}/g).length;
	var cv = c.match(/[aeiouy]{1}/g).length;
	var cc = c.match(/[b-df-hj-np-tv-z]{1}/g).length;
	if(pl % 2 == 0){
		ss = cv * 1.5;
	}else{
		ss = cc;
	}
	if(CF(pl, cl)){
		ss*=1.5;
	}
	return ss;
}

var CF = function(a, b){
	var n = Math.max(a,b);
	for(var i=2; i<=n; i++){
		if(a%i==0 && b%i==0){
			return true;
		}
	}
	return false;
}


//HUNGARIAN
var subRows = function(){
	var n = matrix.length;
	for(var i=0; i<matrix.length; i++){
		var rMin = Number.MAX_VALUE;
		for(var j=0; j<matrix.length; j++){
			rMin = Math.min(matrix[i][j], rMin);
		}
		for(var j=0; j<matrix.length; j++){
			matrix[i][j]-=rMin;
		}
	}
	return matrix;
}
var subCols = function(){
	var n = matrix.length;
	for(var i=0; i<matrix.length; i++){
		var cMin = Number.MAX_VALUE;
		for(var j=0; j<matrix.length; j++){
			cMin = Math.min(matrix[j][i], cMin);
		}
		for(var j=0; j<matrix.length; j++){
			matrix[j][i]-=cMin;
		}
	}
	return matrix;
}

var reverseMatrix = function(){
	var max = findMax();
	var n = matrix.length;
	var reversed = [];
	for(var i=0; i<matrix.length; i++){
		reversed[i] = []
		for(var j=0; j<matrix.length; j++){
			reversed[i][j] = max - matrix[i][j];
		}
	}
	return reversed;
}

var validZ = function(zi, zj){
	return ( coveredCols[zj] != 1 && coveredRows[zi] != 1);
}

var selectZs = function(){
	initCovered();
	var n = matrix.length;
	for(var i=0; i<matrix.length; i++){
		var zs = [];
		for(var j=0; j<matrix.length; j++){
			var z = matrix[i][j];
			if(z == 0){
				if(validZ(i, j)){
					coveredRows[i] = 1;
					coveredCols[j] = 1;
					starsPrimes[i][j] = 1;
				}
			}
		}
	}
}


var findMax = function(){
	var max = Number.MIN_VALUE;
	for(var i=0; i<matrix.length; i++){
		for(var j=0; j<matrix.length; j++){
			max = Math.max(matrix[i][j], max);
		}
	}	
	return max;
}

var adjustWithMin = function(){
	var minM = minUncovered();
	for(var i=0; i<matrix.length; i++){
		if(!coveredRows[i]){
			for (var j = 0; j < matrix.length; j++) {
				matrix[i][j] -= minM;
			}
		}
	}

	for(var i=0; i<matrix.length; i++){
		if(coveredCols[i]){
			for (var j = 0; j < matrix.length; j++) {
				matrix[j][i] += minM;
			}
		}
	}
}

var minUncovered = function(){
	var min = Number.MAX_VALUE;
	for (var i = 0; i < matrix.length; i++) {
		if(coveredRows[i] != 1){
			for (var j = 0; j < matrix.length; j++) {
				if(coveredCols[j] != 1){
					min = Math.min(matrix[i][j], min);
				}
			}
		}
	}
	return min;
}

var coverColumns = function(){
	var nC = 0;
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix.length; j++) {
			if(starsPrimes[i][j] == 1){
				coveredCols[j] = 1;
				nC++;
			}
		}
	}
	return nC;
}

var primeZ = function(){
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix.length; j++) {
			if(coveredCols[j] == 0 && coveredRows[i] == 0){
				if(matrix[i][j] == 0 && starsPrimes[i][j] == 0){
					starsPrimes[i][j]=2;
					currentPrime = [i,j];
					return true;
				}
			}
		};
	};
	return false;
}

var flipColRow = function(){
	var cpi = currentPrime[0];
	var cpj = currentPrime[1];
	console.log('FLIPPING('+cpi+','+cpj+')');
	printMatrix(matrix);
	for (var j = 0; j < matrix.length; j++) {
		if(j != cpj && starsPrimes[cpi][j] == 1){
			coveredCols[j]=0;
			coveredRows[cpi]=1;
			return true;
		}
	}
	// console.log('BAD FLIP');
	//reverse last prime	
	starsPrimes[cpi][cpj] = 0;
	return false;
}

var starInCol = function(){
	var cpi = primeSeries[primeSeries.length-1][0];
	var cpj = primeSeries[primeSeries.length-1][1];
	console.log('Star In Col(p:'+ cpi + ',' +cpj+')');
	printMatrix(matrix);
	for (var i = 0; i < matrix.length; i++) {
		if(i != cpi && starsPrimes[i][cpj] == 1){
			starSeries.push([i,cpj]);
			return true;
		}
	}
	return false;
}

var primeInRow = function(){
	var csi = starSeries[starSeries.length-1][0];
	var csj = starSeries[starSeries.length-1][1];
	console.log('Prime In Row(s:'+ csi + ',' +csj+')');
	printMatrix(matrix);
	for (var j = 0; j < matrix.length; j++) {
		if(j != csj && starsPrimes[csi][j] == 2){
			if(matrix[csi][j]==0 ){
				if(coveredRows[csi]==0 && coveredCols[csj]==1){
					primeSeries.push([csi,j]);
					return true;
				}
			}
		}
	}
	console.log('FALSEEEEEE');
	return false;
}



var viveLaHongrie = function(){
	var n = matrix.length;
	init();
	var step=1;
	var done = 7;
	while( step != done ) {
		sleep(50);;
		// console.log(step);
		// printMatrix(matrix);
		switch( step ){
			case 1:
				subRows();
				subCols();
				step = 2;
			break;
			case 2:
				selectZs();
				initCovered();
				step = 3;
			break;
			case 3:
				if(coverColumns() >= matrix.length){
					step = done;
				}else{
					step = 4;
				}
			break;
			case 4:
				step = 6;
				while(primeZ()){
					if(!flipColRow()){
						step = 5;
						break;
					}
				}
			break;
			case 5:

				primeSeries = [currentPrime];
				starSeries = [];
				while(starInCol()){
					if(!primeInRow())
						break;
				}
				step5Cleanup();
				step = 3;
			break;
			case 6:
				adjustWithMin();
				step = 4;
			break;
		}
	}

	return starsPrimes;
}

function sleep(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}

var printMatrix = function(mx){
	var n = mx.length;
	for(var i=0; i<mx.length; i++){
		var cc = '';
		for(var j=0; j<mx.length; j++){
			var mark = '';
			if(starsPrimes[i][j]==1){
				mark = '*';
			}else if(starsPrimes[i][j]==2){
				mark = "'";
			}

			var padding = '      ';
			if (coveredRows[i]){
				padding +='======';
			}
			cc += (padding + mark+ mx[i][j]).slice(-6);

			if(coveredCols[j]){
				cc +="|";
			}
		}
		console.log(cc);
	}
	console.log("\n");
}

function codeEvalExecute(line) 
{ 
	var args = line.toLowerCase().split(";");
	var cs = args[0].split(",");
	var ps = args[1].split(",");
	var mx = discountMatrix(cs,ps);
	matrix = mx;
	matrix = reverseMatrix();
	var assignment = viveLaHongrie();
	var ans = 0;

	for(var i=0; i<cs.length; i++){
		for(var j=0; j<ps.length; j++){
			if(assignment[i][j] == 1){
				ans += mx[i][j];
			}
		}
	}
	console.log(ans);
	return ans;
}
codeEvalExecute("Jeffery Lebowski,Walter Sobchak,Theodore Donald Kerabatsos,Jack Abraham,John Evans,Ted Dziuba,Jareau Wade,Rob Eroh,Mahmoud Abdelkader,Wenyi Cai,Justin Van Winkle,Gabriel Sinkin,Aaron Adelson,Peter Gibbons,Michael Bolton,Samir Nagheenanajar;Half & Half,Colt M1911A1,16lb Bowling ball,iPad 2 - 4-pack,Girl Scouts Thin Mints,Nerf Crossbow,Batman No. 1,Football - Official Size,Bass Amplifying Headphones,Elephant food - 1024 lbs,Three Wolf One Moon T-shirt,Dom Perignon 2000 Vintage,Widescreen Monitor - 30-inch,Red Swingline Stapler,Printer paper,Vibe Magazine Subscriptions - 40 pack");
codeEvalExecute("Jack Abraham,John Evans,Ted Dziuba;iPad 2 - 4-pack,Girl Scouts Thin Mints,Nerf Crossbow");
codeEvalExecute("Jeffery Lebowski,Walter Sobchak,Theodore Donald Kerabatsos,Peter Gibbons,Michael Bolton,Samir Nagheenanajar;Half & Half,Colt M1911A1,16lb bowling ball,Red Swingline Stapler,Printer paper,Vibe Magazine Subscriptions - 40 pack");
codeEvalExecute("Jareau Wade,Rob Eroh,Mahmoud Abdelkader,Wenyi Cai,Justin Van Winkle,Gabriel Sinkin,Aaron Adelson;Batman No. 1,Football - Official Size,Bass Amplifying Headphones,Elephant food - 1024 lbs,Three Wolf One Moon T-shirt,Dom Perignon 2000 Vintage");