var fs = require("fs");
 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
 	if(line!=""){
     var chain = {}, len = 0;

     line.split(";").forEach(function(e){
       var c = e.split("-");
       chain[c[0]] = c[1];
       len++;
     });

     var steps = 1, step = chain["BEGIN"];

     while(steps < len){
       step = chain[step];
       steps++;
     }

     console.log( steps === len && step === "END" ? "GOOD" : "BAD" );

	}
 });
