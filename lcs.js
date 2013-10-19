var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var args = line.split(";");
		var s1 = args[0];
		var s2 = args[1];
		var l = [];
		var s = [];

		for (var i = 0; i <= s1.length; i++) {
			l[i] = [];
			l[i][0] = 0;
			s[i] = [];
			s[i][0] = 0;
		}
		
		for (var j = 0; j <= s2.length; j++) {
			l[0][j] = 0;
			s[0][j] = 0;
		}

		for (var i = 1; i <= s1.length; i++) {
			s[i] = [];
			var a = s1.charAt(i-1);
			for (var j = 1; j <= s2.length; j++) {
				var b = s2.charAt(j-1);
				var left = l[i][j-1];
				var up = l[i-1][j];
				if(a == b){
					l[i][j]=l[i-1][j-1]+1;
					s[i][j]='!';
				}else if(up>=left){
					l[i][j]=up;
					s[i][j]='^';
				}else{
					l[i][j]=left;
					s[i][j]='<';
				}
			}
		}

		var ans = '';
		var i = s1.length;
		var j = s2.length;

		while( l[i][j] > 0 ){
			if(s[i][j] == '!'){
				ans = s2.charAt(j-1) + ans; 
				i--;
				j--;
			}else if(s[i][j] == '^'){
				i--;
			}else{
				j--;
			}
		};
		console.log(ans);
	}
});
