var palindrome = function(n){
	var num = n.toString();
	for(var i=0, j=num.length-1; i<j; i++ && j-- ){
		if(num.charAt(i) != num.charAt(j)){
			return false;
		}
	}
	return true;
}

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
    	var r = line.split(" ");
    	var l = r.shift();
    	var r = r.shift();
    	var ans = 0;

    	for(var i=l; i<=r; i++){
    		var palindromes = 0;
    		for(var j=i; j<=r; j++){
    			var palindromes = 0;
    			for(var k=i; k <= j; k++){
	    			if( palindrome(k) ){
	    				palindromes++;
	    			}
    			}
    			if(palindromes%2 == 0){
    				ans++;
    			}
    		}
    	}
    	console.log(ans)
        return 0;
    }
});