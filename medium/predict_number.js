var Sequencer = function () {}

Sequencer.prototype = {
  getNthSequenceChar: function (n) {
    var nth = 0;
    while(n > 0){
      n = n - Math.pow( 2, Math.floor( Math.log(n) / Math.log(2) ) );
      nth = nth == 2 ? 0 : nth+1;
    }
    return nth;
  }
}

var s = new Sequencer();
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	if(line != ""){
		console.log(s.getNthSequenceChar(parseInt(line)));
	}
});
