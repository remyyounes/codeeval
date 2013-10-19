var fs = require("fs");
 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
 	if(line!=""){
		var args = line.split(" ");
		var n = args[0];
		var l = args.slice(1);
		var t = [];

		for (var i = 0; i < n; i++) {
			t[i] = 0;
		};

		for (var i = 1; i < n; i++) {
			var abs = Math.abs(l[i]-l[i-1]);
			t[abs] = 1;
		}

		for (var i = 1; i < n; i++) {
			if (t[i] == 0){
				console.log('Not jolly');
				return;
			}
		};
		console.log('Jolly');
 	}
 }); 