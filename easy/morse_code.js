var MorseDecoder = function(){
  this.morseTable = {
    '.-'    : 'A',
    '-...'  : 'B',
    '-.-.'  : 'C',
    '-..'   : 'D',
    '.'     : 'E',
    '..-.'  : 'F',
    '--.'   : 'G',
    '....'  : 'H',
    '..'    : 'I',
    '.---'  : 'J',
    '-.-'   : 'K',
    '.-..'  : 'L',
    '--'    : 'M',
    '-.'    : 'N',
    '---'   : 'O',
    '.--.'  : 'P',
    '--.-'  : 'Q',
    '.-.'   : 'R',
    '...'   : 'S',
    '-'     : 'T',
    '..-'   : 'U',
    '...-'  : 'V',
    '.--'   : 'W',
    '-..-'  : 'X',
    '-.--'  : 'Y',
    '--..'  : 'Z',
    '.----' : '1',
    '..---' : '2',
    '...--' : '3',
    '....-' : '4',
    '.....' : '5',
    '-....' : '6',
    '--...' : '7',
    '---..' : '8',
    '----.' : '9',
    '-----' : '0'
  }
};

MorseDecoder.prototype = {
  decode: function(encoded){
    var decoded = [];
    var words = encoded.split("  ");
    for (var i = 0; i < words.length; i++){
      decoded.push(this.decodeWord(words[i]));
    };
    return decoded.join(" ");
  },
  decodeWord: function(encodedWord){
    var letters = encodedWord.split(" ");
    var decodedWord = "";
    for (var i = 0; i < letters.length; i++) {
      decodedWord += this.decodeLetter(letters[i]);
    };
    return decodedWord;
  },
  decodeLetter: function(encodedLetter){
    return this.morseTable[encodedLetter];
  }
};

var md = new MorseDecoder();
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
  if (line !== "") {
    console.log( md.decode(line) );
  }
});

module.exports.MorseDecoder = MorseDecoder;