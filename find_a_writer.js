var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
    	var l = line.split("|");
    	var letters = l[0];
    	var indices = l[1].trim().split(" ");
    	var names = "";
    	for (var i = 0; i < indices.length; i++) {
    		names += letters[indices[i]-1];
    	};
    	console.log(names);
    }
});
