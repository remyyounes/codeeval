var Primer = function(){
	this.primes = [];
}

Primer.prototype = {
	getPrimesUnder: function(n){
		if(this.primes[this.primes.length-1] >= n){
			return this.primes.filter(function(c){return c < n;});
		}else{
			return this.sieveOfEratosthenes(n);
		}
	},
	sieveOfEratosthenes: function(n){
		var candidates = [];
		for (var i = 2; i < n; i++) candidates[i] = i;
		for (var p = 2; p <= Math.sqrt(n); p++) {
			var p2 = p * p;
			if(candidates[p]){
				for (var j = p2; j < n; j+=p) {
					candidates[j] = false;
				}
			}
		}
		this.primes = candidates.filter(function(c){return c > 0;});
		return this.primes;
	}

};

var primer = new Primer();
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		console.log(primer.getPrimesUnder(parseInt(line, 10)).join(","));
	}
});
