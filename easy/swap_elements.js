var ElementSwapper = function(){};

ElementSwapper.prototype = {
  swap: function(list, swaps){
    for (var i = 0; i < swaps.length; i++){
      var s = swaps[i].split("-");
      this.swapIdx(list, s[0], s[1]);
    }
    return list;
  },
  swapIdx: function(list, i, j){
    var t = list[i];
    list[i] = list[j];
    list[j] = t;
    return list;
  }
};

var es = new ElementSwapper();
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
  if (line !== "") {
    var argz = line.split(" : ");
    var numbers = argz[0].split(" ");
    var swaps = argz[1].split(", ");
    console.log( es.swap(numbers, swaps).join(' ') );
  }
});

module.exports.ElementSwapper = ElementSwapper;