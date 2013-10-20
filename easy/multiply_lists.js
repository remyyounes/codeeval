var ListOperator = function(){};

ListOperator.prototype = {
  multiply: function(a, b){
    var c = [];
    for (var i = 0; i < a.length; i++){
      c.push(a[i] * b[i]);
    }
    return c;
  },
};

var lo = new ListOperator();
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
  if (line !== "") {
    var lists = line.split(" | ");
    var listA = lists[0].split(" ");
    var listB = lists[1].split(" ");
    console.log( lo.multiply(listA, listB).join(' ') );
  }
});

module.exports.ListOperator = ListOperator;