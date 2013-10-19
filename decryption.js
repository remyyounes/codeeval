var msg = "012222 1114142503 0313012513 03141418192102 0113 2419182119021713 06131715070119";
var key = "BHISOECRTMGWYVALUZDNFJKPQX";
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var indexToChars = function(msg){
	var words = msg.split(" ");
	for(var i=0; i<words.length; i++){
		var w = words[i].toString();
		var nw = '';
		do{
			var l = w.substring(0,2);
			w = w.substring(2);
			l = parseInt(l) ;
			l = key[l];
			nw+=l;
		}while( w.length > 0);
		words[i] = nw;
	}
	return words.join(" ");
}

var deshift = function(msg){
	var res = '';
	for(var i=0; i<msg.length; i++){
		var l = msg[i];
		var nl = deshiftLetter( deshiftLetter( l ) );
		res+=nl;
	}
	return res;
}

var deshiftLetter = function(l){
	if( l == ' ' ){ return ' ';}
	var i = key.indexOf(l);
	return alphabet[i];
}

var ans = deshift(indexToChars(msg));
console.log(ans);
