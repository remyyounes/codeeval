
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
      var cities = line.replace(/;$/,'').split(";")
        .map(function(c){return c.split(",");})
        .sort(function(a,b) {return a[1] - b[1];});

      var itinerary = [cities[0][1]];
      for(var i=1; i<cities.length; i++){
        itinerary.push(cities[i][1]-cities[i-1][1]);
      }
      console.log(itinerary.join(","));
    }
});
