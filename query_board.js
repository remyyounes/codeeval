var n = 256;
var matrix = [];
for (var i = 0; i < n; i++) {
	matrix[i] = [];
	for (var j = 0; j < n; j++) {
		matrix[i][j] = 0;
	}
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var args = line.split(" ");
		var cmd = args[0];
		var j = parseInt(args[1]);
		var x = parseInt(args[2]);

		if(cmd=="QueryCol"){
			var col=0;
			for (var i = 0; i < matrix.length; i++) {
				col+=matrix[i][j];
			}
			console.log(col);
			return col;
		}else if(cmd=="QueryRow"){
			var row=0;
			for (var i = 0; i < matrix.length; i++) {
				row+=matrix[j][i];
			}
			console.log(row);
			return row;
		}else if(cmd=="SetRow"){
			for (var i = 0; i < matrix.length; i++) {
				matrix[j][i]=x;
			}
			return;
		}else if(cmd=="SetCol"){
			for (var i = 0; i < matrix.length; i++) {
				matrix[i][j]=x;
			}
			return;
		}
	}
});