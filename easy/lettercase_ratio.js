var pct = function(a, b) { return (a / b * 100).toFixed(2); };

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
      var chars = line.length;
      var uppers = 0;
      for (var i = 0; i < chars; i++) {
        var c = line[i];
        if(c == c.toUpperCase()) uppers++;
      }
      console.log( 'lowercase:', pct((chars-uppers), chars), 'uppercase:', pct(uppers, chars));
    }
});
