var fs  = require("fs");
var Slang = function() { };

Slang.prototype = {
  even: false,
  slangIdx: 0,
  enhancers: [
    ', yeah!',
    ', this is crazy, I tell ya.',
    ', can U believe this?',
    ', eh?',
    ', aw yea.',
    ', yo.',
    '? No way!',
    '. Awesome!',
  ],

  parseLine: function(line) {
    return line;
  },
  getSlang: function() {
    var slang = this.enhancers[this.slangIdx];
    if (++this.slangIdx >= this.enhancers.length) this.slangIdx = 0;
    return slang;
  },
  findReplacements: function(phrase) {
    var replacements = [];
    phrase.split('').forEach( function(char, i) {
      if(char === '?' || char === '.' || char === '!') {
        if (this.even) {
          replacements.push({
            idx: i,
            slang: this.getSlang(),
          });
        }
        this.even = !this.even;
      }
    }.bind(this));
    return replacements;
  },
  replaceSlang: function(phrase, replacements) {
    var replaced = phrase.split('');
    for (var i = replacements.length - 1; i >= 0; i--) {
      var idx = replacements[i].idx;
      var slang =replacements[i].slang;
      replaced.splice(idx, 1, slang);
    }
    return replaced.join('');
  },
  processCase: function(input) {
    var phrase = this.parseLine(input);
    var replacements = this.findReplacements(phrase);
    return this.replaceSlang(phrase, replacements);
  },
};

var slang = new Slang();
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
      var hip = slang.processCase(line);
      console.log(hip);
    }
});

module.exports = Slang;
