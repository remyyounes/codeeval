function overlapping(line) 
{ 
	var args = line.split(',');

	var Aul = [ parseInt(args[0]) , parseInt(args[1]) ];
	var Abr = [ parseInt(args[2]) , parseInt(args[3]) ];
	var Bul = [ parseInt(args[4]) , parseInt(args[5]) ];
	var Bbr = [ parseInt(args[6]) , parseInt(args[7]) ];

	if ( (Aul[0] < Bul[0] && Abr[0] > Bul[0]) ||
		 (Aul[0] < Bbr[0] && Abr[0] > Bbr[0])){
		if ( (Aul[1] > Bbr[1] && Abr[1] < Bbr[1]) ||
			 (Aul[1] > Bul[1] && Abr[1] < Bul[1])){
			return 'True';
		}
	}
	return 'False';
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		console.log(overlapping(line));
	}
});