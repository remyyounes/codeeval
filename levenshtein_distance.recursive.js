// console.time("execTime");
var visits = 0;
var WordSet = function(){
	this._lookUp = [];
	this.size = 0;
}
WordSet.prototype = {
	has: function(word){ return this._lookUp[word] === 1;},
	add: function(word){
		if(!this.has(word)){
			this.size++;
			this._lookUp[word] = 1;
		}
	}
};

var planFriendsVisit = function(word){
	network.add(word);
	// profiler.resume();
	for (var i = 0; i <= word.length; i++) {
		var prefix = word.substring(0, i);
		var suffix = word.substring(i);

		var r = prefix + suffix.substring(1);//remove letter at i
		if(dictionnary.has(r) && !network.has(r)) planFriendsVisit(r);

		for (var j = 0; j < alphabet.length; j++) {
			var l = alphabet[j];
			var a = prefix + l + suffix; //add letter at i
			var r = prefix + l + suffix.substring(1); //replace letter at i
			if(dictionnary.has(a) && !network.has(a)) planFriendsVisit(a);
			if(dictionnary.has(r) && !network.has(r)) planFriendsVisit(r);
		}
	}
	// profiler.pause();
}

var alphabet = "abcdefghijklmnopqrstuvwxyz";
var network = new WordSet();
var dictionnary = new WordSet();
// var profiler = require("profiler");
var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	if (line != "") {
		dictionnary.add(line);
	}
});

planFriendsVisit("hello");

console.log(  network.size-1  );
// var util = require('util');
// console.log(util.inspect(process.memoryUsage()));
// console.timeEnd("execTime");
