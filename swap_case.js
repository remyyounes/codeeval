String.prototype.swapCase = function(){
	var swapped = "";
	for (var i = 0; i < this.length; i++) {
		var l = this.charAt(i);
		if(l == l.toUpperCase())
			swapped += l.toLowerCase();
		else
			swapped += l.toUpperCase();
	}
	return swapped;
}

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
    	console.log(line.swapCase());
    }
});
