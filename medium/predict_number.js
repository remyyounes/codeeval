var Sequencer = function () {
  this.sequence = "0";
}

Sequencer.prototype = {
  getNthSequenceChar: function (n) {
    while(this.sequence.length < n) {
      console.log(this.sequence.length);
      this.next();
    }
    return this.sequence.charAt(n);
  },
  next: function() {
    var seq = this.sequence.substring();
    for (var i = 0; i < seq.length; i++) {
      var j = parseInt(seq.charAt(i));
      this.sequence += (j < 2) ? j+1 : 0;
    }
  }
}

var s = new Sequencer();
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line != ""){
		console.log( s.getNthSequenceChar(line));
    // console.log(line);
	}
});