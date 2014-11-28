
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
      var args = line.split(" "),
        nums = args[0],
        pattern = args[1],
        num = 0, j = 0, c = null, tokens=[],
        total = 0, t = null, n = 0;
      for(var i = 0; i < pattern.length; i++){
        c = pattern[i];
        if(c === "-" || c === "+"){
          tokens.push(num);
          tokens.push(c);
          num=0;
        }else{
          num = num*10 + parseInt(nums[j]) ;
          j++;
        }
      }
      tokens.push(num);

      total = tokens.shift();
      while(t = tokens.shift()){
        n = tokens.shift();
        total += t === "-" ? -n : n;
      }

      console.log(total);
    }
});
