var m = [];
m['ONE HUNDRED'] = 10000;
m['FIFTY'] = 5000;
m['TWENTY'] = 2000;
m['TEN'] = 1000;
m['FIVE'] = 500;
m['TWO'] = 200;
m['ONE'] = 100;
m['HALF DOLLAR'] = 50;
m['QUARTER'] = 25;
m['DIME'] = 10;
m['NICKEL'] = 5;
m['PENNY'] = 1;

var codeEvalExecute = function (line) 
{ 	
	var args = line.split(";");
	var c = parseInt(args[1]*100) - parseInt(args[0]*100);
	// c/=100;	
	var ans = [];
	if(c == 0){
		ans.push('ZERO');
	}else if(c < 0){
		ans.push('ERROR');
	}else{
		for(var i in m){
			var b = m[i];
			while(c >= b && c > 0){
				ans.push(i);
				c-=b;
			}
		}
	}
	ans = ans.join(",");
	return ans;
}

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
        var ans = codeEvalExecute(line);
        console.log(ans);
        return 0;
    }
});
