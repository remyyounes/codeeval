var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
  if(line !== "") {
    if (line < 0 || line > 101) console.log("This program is for humans");
    else if( line < 3 ) console.log("Still in Mama's arms");
    else if( line < 5 ) console.log("Preschool Maniac");
    else if( line < 12 ) console.log("Elementary schools");
    else if( line < 15) console.log("Middle school");
    else if( line < 19 ) console.log("High school");
    else if( line < 23 ) console.log("College");
    else if( line < 66 ) console.log("Working for the man");
    else if( line < 101 ) console.log("The Golden Years");
  }
});
