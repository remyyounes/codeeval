var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line != "") {
		var l = line.split(", ");
		var s = l[0];
			d = l[1];
		var n = s.length;
		var regexp = new RegExp('['+d+']','ig');
		console.log(s.replace(regexp, ''));
	}
});