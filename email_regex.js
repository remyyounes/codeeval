var mail_rgx =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
function validMail(line) 
{ 	
	return mail_rgx.test(line)?'true':'false';
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		console.log( validMail(line) );
	}
});