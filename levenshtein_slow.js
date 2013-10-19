var count = 0;
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
	},
	getWordsOfLength: function(n){
		var similars = this._arr.filter( 
			function(e, i, arr){ 
				return e.length >= n-1 && e.length <= n+1; 
			} 
		);
		return similars;
	},
	getFriends: function(word){
		var friends = this._arr.filter(
			function(e){
				return  levenshteinDistance(word, e) <= 1;
			}
		);
		return friends;
	}
};

var levenshteinDistance = function (s, t)
{
	// for all i and j, d[i,j] will hold the Levenshtein distance between
	// the first i characters of s and the first j characters of t;
	// note that d has (m+1)*(n+1) values
	// declare var d[0..m, 0..n];
	var d = [];

	// source prefixes can be transformed into empty string by
	// dropping all characters
	for (var i = 0; i <= s.length; i++) {
		d[i]=[];
		d[i][0] = i;
	};

	// target prefixes can be reached from empty source prefix
	// by inserting every characters
	for (var j = 1; j <= t.length; j++) {
		d[0][j] = j;
	};

	for (var j = 1; j <= t.length; j++) {
		for (var i = 1; i <= s.length; i++) {
			if( s[i-1] == t[j-1]){
				d[i][j] = d[i-1][j-1];
			}else{
				d[i][j] = Math.min(
					d[i-1][j] + 1, //del
					d[i][j-1] + 1, //add
					d[i-1][j-1]+1  //rep
				);
			}
		}
	};
	return d[s.length][t.length];
}


var planFriendsVisit = function(word){
	var friends = dictionnary.getFriends(word);
	for (var i = 0; i < friends.length; i++) {
		var s = friends[i];
		if( !network.has(s) ){
			toVisit.add(s);
		} 
	};
}

	// for (var i = 0; i <= word.length; i++) {
	// 	var prefix = word.substring(0,i);
	// 	var suffix = word.substring(i);

	// 	var r = prefix + suffix.substring(1);//remove letter at i
	// 	if(dictionnary.has(r) && !network.has(r)) toVisit.add(r);

	// 	for (var j = 0; j < alphabet.length; j++) {
	// 		var l = alphabet[j];
	// 		var a = prefix + l + suffix; //add letter at i
	// 		var r = prefix + l + suffix.substring(1); //replace letter at i
	// 		if(dictionnary.has(a) && !network.has(a)) toVisit.add(a);
	// 		if(dictionnary.has(r) && !network.has(r)) toVisit.add(r);
	// 	}
	// }

var visit = function(friend){
	if(!network.has(friend))
		toVisit.add(friend);
}
//TODO: REMOVE FROM DICTIONARY AS IT ENTERS NETWORK ?? 
//MAYBE MAKE SURE THAT ITS FRIENDS ARE FOUND 1st
var alphabet = ['','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
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
	console.log(count++);
	planFriendsVisit(word);
}
console.log(  network.size()-1  );