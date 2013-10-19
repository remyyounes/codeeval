var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var ans = "";
		for (var i = 0; i < line.length; i++) {
			var c = line.charCodeAt(i);
			if( 65 <= c && c <= 90){
				ans += String.fromCharCode(c+32);
			}else{
				ans += line.charAt(i);
			}
		}
		console.log(ans);
	}
});