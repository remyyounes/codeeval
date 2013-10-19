var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var sum = parseInt(line);
		var ans = 0;
		while(sum > 0){
			if(sum>=5){
				sum-=5;
			}else if(sum>=3){
				sum-=3;
			}else{
				sum-=1;
			}
			ans++;
		}
		console.log(ans);
	}
});