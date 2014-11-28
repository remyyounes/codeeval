
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
      var nums = line.split(" "),
      num = 0, occurences = 0, prev = null, out = [];
      for(var i=0; i<nums.length; i++){
        num = nums[i];
        if(prev !== null && prev != num){
          out.push(occurences);
          out.push(prev);
          occurences = 1;
        }else{
          occurences++;
        }
        prev = num;
      }
      out.push(occurences);
      out.push(num);
      console.log(out.join(" "));
    }
});
