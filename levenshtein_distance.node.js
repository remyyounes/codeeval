console.time("execTime");
var visits = 0;

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

var WordSet = require('./lib/wordset.js');
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
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
console.timeEnd("execTime");