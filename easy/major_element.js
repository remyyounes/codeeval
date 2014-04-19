var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
        var sequence = line.split(","),
          len = sequence.length,
          hits = [], n = 0,
          major = "None", count = 0;

        for ( var i = 0; i < len; i++ ) {
          n = sequence[i];
          count = (hits[n] || 0) + 1;
          hits[n] = count;
          if(count > len/2){
            major = n;
            break;
          }
        }
        console.log(major);
    }
});
