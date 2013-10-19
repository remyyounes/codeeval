var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	var n = line.length;
	var c = [];
	var beauty = 26;
	var ans = 0;

	for(var i=0; i<n; i++){
		var l = line.charAt(i).toLowerCase().charCodeAt(0);
		if(l >= 'a'.charCodeAt(0) && l <= 'z'.charCodeAt(0)){
			if(c[l] != undefined){
				c[l]++;
			}else{
				c[l] = 1;
			}
		}
	}
	c.sort(function(a,b){return b - a});
	c.forEach(function(value,index){
		ans += value*(beauty--);
	});
	console.log(ans);
});
