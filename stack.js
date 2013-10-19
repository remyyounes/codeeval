var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
			
		var args = line.split(" ");
		var stack = [];
		var ans = [];
		//push
		for (var i = 0; i < args.length; i++) {
			stack.push(args[i]);
		}
		var e;
		//alternate pop
		while(e = args.pop()){
			ans.push(e);
			args.pop();
		}
		console.log(ans.join(" "));
	}
});

