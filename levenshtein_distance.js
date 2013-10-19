// console.time("execTime");
var visits = 0;
var WordSet = function(){
	this._arr = [];
	this._lookUp = []
}
WordSet.prototype = {
	has: function(word){ return this._lookUp[word] === 1;},
	size: function(){ return this._arr.length; },
	add: function(word){
		if(!this.has(word)){
			this._arr.push(word);
			this._lookUp[word] = 1;
		}
	},
	shift: function(){
		var del = this._arr.shift();
		this._lookUp[del] = 0;
		return del;
	}
};

var planFriendsVisit = function(word){
	for (var i = 0; i <= word.length; i++) {
		var prefix = word.substring(0,i);
		var suffix = word.substring(i);

		var r = prefix + suffix.substring(1);//remove letter at i
		if(dictionnary.has(r) && !network.has(r)) toVisit.add(r);

		for (var j = 0; j < alphabet.length; j++) {
			var l = alphabet[j];
			var a = prefix + l + suffix; //add letter at i
			var r = prefix + l + suffix.substring(1); //replace letter at i
			if(dictionnary.has(a) && !network.has(a)) toVisit.add(a);
			if(dictionnary.has(r) && !network.has(r)) toVisit.add(r);
		}
	}
}

var visit = function(friend){
	if(!network.has(friend))
		toVisit.add(friend);
}

var alphabet = "abcdefghijklmnopqrstuvwxyz";
var toVisit = new WordSet();
var network = new WordSet();
var dictionnary = new WordSet();

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	if (line != "") {
		dictionnary.add(line);
	}
});

toVisit.add("hello");
while(toVisit.size() > 0){
	var word = toVisit.shift();
	network.add(word);
	planFriendsVisit(word);
}
console.log(  network.size()-1  );
// console.timeEnd("execTime");

// module.exports.WordSet = WordSet;