var pol = function(args){
	if(args.length == 1){
		return parseInt(args[0]);
	}
	var op = args.shift();
	var x = parseInt(args.pop());
	if(op == '+'){
		return pol(args) + x;
	}else if(op == '*'){
		return pol(args) * x;
	}else if(op == '/'){
		return pol(args) / x;
	}

}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var args = line.split(' ');
		var ans = pol(args);
		console.log(ans);
	}
});
