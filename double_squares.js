var first = true;

var fs = require("fs");
 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (x){ 
 	if(x!=""){
	 		
		if(first){
			first=false;
			return;
		}
		var ans = 0;
		var j = Math.ceil(Math.sqrt(x));
		var i = 0;
		while(i<=j){
			var n = (j*j) + (i*i);
			if(n<x){
				i++;
			}else if(n>x){
				j--;
			}else{
				ans++;
				i++;
				j--;
			}
		}
		console.log(ans);
 	}
 }); 