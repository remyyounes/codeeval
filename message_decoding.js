var Decoder = function(){};

Decoder.prototype = {
	decode: function(message){
		this._splitMessage(message);
		var kLen, c, decoded = "";
		while( (kLen = this._nextKeyLength()) > 0 ){
			while( (c = this._nextChar(kLen)) != ''){
				decoded += c;
			}
		}
		return decoded;
	},
	_splitMessage: function(message){
		var match = message.match(/[0-9]{3}/);
		this._header = message.substring(0,match.index);
		this._code = message.substring(match.index);
	},
	_nextChar: function(keyLength){
		var cc = this._code.substring(0,keyLength);
		this._code = this._code.substring(keyLength);
		return this._codeToChar(cc);
	},
	_codeToChar: function(cc){
		var base = 0;
		var pow = 2;
		var bVal = parseInt(cc,2);
		for (var i = 0; i < cc.length-1; i++) {
			base += pow - 1;
			pow *= 2
		};
		return (bVal == pow-1) ? '' : this._header[bVal+base];
	},
	_nextKeyLength: function(){
		var key = this._code.substring(0,3);
		this._code = this._code.substring(3);
		return parseInt(key, 2);
	}
}

var decoder = new Decoder();
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
    	console.log(decoder.decode(line));
    }
});