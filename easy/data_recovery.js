var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
        var args = line.split(";"),
        sentence = args[0].split(" "),
        sequence = args[1].split(" "),
        len = sentence.length,
        total = len*(len+1)/2,
        sorted = [];
      for (var i=0; i < len-1; i++){
        var j = sequence[i];
        sorted[j] = sentence[i];
        total -= j;
      }
      sorted[total] = sentence[i];
      console.log(sorted.join(" "));
    }
});
