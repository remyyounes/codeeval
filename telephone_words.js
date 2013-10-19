var keys = [];
	keys[0] = ['0'];
	keys[1] = ['1'];
	keys[2] = ['a','b','c'];
	keys[3] = ['d','e','f'];
	keys[4] = ['g','h','i'];
	keys[5] = ['j','k','l'];
	keys[6] = ['m','n','o'];
	keys[7] = ['p','q','r','s'];
	keys[8] = ['t','u','v'];
	keys[9] = ['w','x','y','z'];

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var word = line.toString();
		var n = word.length;
		var ans = 0;
		ans = phoneWord(word).join(",");
		console.log(ans);
	}
});

function phoneWord(word){

	var k = parseInt(word[0]);
	var chars = keys[k];
	var n = chars.length;
	if(word.length==1){
		return chars;
	}
	var subPhones = phoneWord(word.substring(1));
	var m = subPhones.length;
	var ans = [];
	for(var i=0; i<n; i++){
		for(var j=0; j<m; j++){
			ans.push( chars[i] + subPhones[j] );
		}
	}
	return ans;
}
