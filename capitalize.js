var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
        var ans = line.replace(/\w\S*/g, function(t){  return t.charAt(0).toUpperCase() + t.substr(1)});
        console.log ( ans );
    }
});