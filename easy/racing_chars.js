var fs  = require("fs");
var trackWidth = 12;
var currentPosition = -1;
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
        var chars = line.split(""),
        nextPosition = -1,
        direction = "|",
        c = null;

        for ( var i = 0; i < trackWidth; i++ ) {
          c = chars[i];
          if( c === "C" ) { nextPosition = i; break; }
          else if( c === "_" ) { nextPosition = i; }
        }

        if(nextPosition < currentPosition)
          direction = "/";
        else if(currentPosition > -1 && currentPosition < nextPosition)
          direction = "\\";

        currentPosition = nextPosition;
        chars[currentPosition] = direction;
        console.log(chars.join(""));
    }
});
