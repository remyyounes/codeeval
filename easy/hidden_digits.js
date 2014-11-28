var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
      var output = "";
      for(var i =0; i<line.length; i++){
        var c = line.charCodeAt(i);
        if( c >= 97 && c <= 106 ) output += c-97;
        else if( c >= 48 && c<= 57 ) output += (c - 48);
      }
      console.log(output ? output : "NONE");
    }
});
