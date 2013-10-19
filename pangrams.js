var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line != "") {
		var l = line.toLowerCase();
		var n = l.length;
		var zC = 'z'.charCodeAt(0)+1,
			aC = 'a'.charCodeAt(0),
			letters = [],
			ans = '';
		for (var i = aC; i<zC; i++){
			letters[i]=true;
		}

		for(var i=0; i<n; i++){
			var cC = l.charCodeAt(i);
			if(letters[cC] !== undefined){
				letters[cC]=false;
			}
		}
		for (var i = aC; i<zC; i++){
			if(letters[i]){
				ans+= String.fromCharCode(i);
			}
		}
		ans = ans ? ans:'NULL';
		console.log(ans);
	}
});