var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var d = parseInt(line);
		var ans = [1];
		var m = [[1]];
		for(var i=1; i<d; i++){
			m[i]=[];
			for(var j=0; j<=i;j++){
				var a = j>0? m[i-1][j-1]:0;
				var b = j<i? m[i-1][j]:0;
				m[i][j]= a + b;
				ans.push(m[i][j]);
			}
		}
		ans = ans.join(" ");
		console.log(ans);
	}
}); 
