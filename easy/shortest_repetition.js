var StringPeriod = function(){};

StringPeriod.prototype = {
  getShortestPeriod: function(w){
    var shortestPeriod = 0;
    do{
      shortestPeriod++;
      var sub = w.slice(0, shortestPeriod);
      var foundShortest = this.isValidPeriod(w, sub);
    }while(!foundShortest);

    return shortestPeriod;
  },
  isValidPeriod: function(w, sub){
    var n = w.length;
    var m = sub.length;
    for (var i = 0; i < (n/m); i++) {
      var j = i*m;
      if(sub != w.slice(j, j+m)) return false;
    };
    return true;
  }
};

var sp = new StringPeriod();
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
  if (line !== "") {
    console.log(sp.getShortestPeriod(line));
  }
});