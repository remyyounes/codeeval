var ContentSorter = function(){};

ContentSorter.prototype = {
  sortNumbers: function(content){
    var sorted = [];
    var nums = [];
    var alphas = [];
    for (var i = 0; i < content.length; i++){
      var elem = content[i];
      if(!isNaN(elem))
        nums.push(elem)
      else
        alphas.push(elem);
    }
    if(alphas.length) sorted.push(alphas.join(","));
    if(nums.length) sorted.push(nums.join(","));
    return sorted.join("|");;
  }
};

var cs = new ContentSorter();
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
  if (line !== "") {
    var toBeSorted = line.split(",");
    console.log( cs.sortNumbers(toBeSorted) );
  }
});

module.exports.ContentSorter = ContentSorter;