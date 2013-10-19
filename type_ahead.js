
var TypeAhead = function(){
	this.nGrams;
	this.numGrams = 5;
}

TypeAhead.prototype = {
	loadCorpus: function( corpus ){
		this.corpus = corpus;
		this.extractNGrams();
	},
	extractNGrams: function(){
		var words = this.corpus.toLowerCase().replace(/[^a-zA-Z]+/g, " ").replace(/\s+/g, " ").split(' ');
		this.nGrams = [];
		for (var i = 1; i <= this.numGrams; i++) this.nGrams[i] = [];
		for (var i = 0; i < words.length; i++) {
			var w = words[i];
			this.nGrams[1][w] = (this.nGrams[1][w] || 0) + 1;
			for (var j = 2; j <= this.numGrams && i+j < words.length; j++) {
				w += " " + words[i+j-1]; 
				this.nGrams[j][w] = (this.nGrams[j][w] || 0) + 1;
			}
		}
	},
	getOcurrences: function (n, word){
		var results = [];
		var totalOccur = 0;
		for (var key in this.nGrams[n]) {
			var m, occurences = this.nGrams[n][key];
			if( (m = key.match(word)) != null ){
				if(m.index+word.length<key.length){
					results.push([occurences,key]);
					totalOccur+=occurences;
				}
			}
		}
		return [totalOccur, results];
	},
	guess: function (n, word){
		
		var oc = this.getOcurrences(n, word);
		var totalOccur = oc[0];
		var results = oc[1];
		var scores = "";

		for (var i = 0; i < results.length; i++) {
			results[i][0] = (results[i][0]/totalOccur).toFixed(3);
			results[i][1] = results[i][1].substring( results[i][1].indexOf(word) + word.length).replace(/^\s+/, '');
		};
		results.sort(function (a,b){
			if(a[0]==b[0])
				return b[1]<a[1];
			return b[0]-a[0];
		});
		for (var i = 0; i < results.length; i++) results[i] = results[i][1] + ',' + results[i][0];

		return results;
	}
}

var th = new TypeAhead();
var corpus = "Mary had a little lamb its fleece was white as snow; And everywhere that Mary went, the lamb was sure to go.  It followed her to school one day, which was against the rule; It made the children laugh and play, to see a lamb at school. And so the teacher turned it out, but still it lingered near, And waited patiently about till Mary did appear. \"Why does the lamb love Mary so?\" the eager children cry;\"Why, Mary loves the lamb, you know\" the teacher did reply.\"";
th.loadCorpus(corpus);
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line != "") {
		var args = line.toLowerCase().split(',');
		var n = args[0];
		var word = args[1];
		var ans = th.guess(n, word);
		console.log(ans.join(';'));
	}
});