var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var N = parseInt(line);
		var ans = [];
		for(var p=0, i=0; i < N; i++){
			for(var c=2; c <= i-1; c++){
				if( i%c == 0){
					break;
				} 
			}
			if(c == i){
				ans.push(i);
			}
		}
		ans = ans.join(",");
		console.log(ans);
	}
});
