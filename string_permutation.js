var permute = function(arr){
	var perms = [];
	if(arr.length <= 1 ) {
		return [arr];
	}
	for(var i=0; i<arr.length; i++){
		var letter = arr[i];
		var rest = arr.slice(0);
		rest.splice(i,1);
		var perm = permute(rest);
		for(var j=0; j<perm.length; j++){
			var p =  perm[j];
			p.unshift(letter);
			perms.push( p );
		}
	}
	return perms;
}

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
    	var l = line.split(";");
    	var ans = permute(line.split(""));
    	ans.map(function(e,i){
			ans[i] = ans[i].join("");
    	});
    	console.log(ans.sort().join(","));
        return 0;
    }
});