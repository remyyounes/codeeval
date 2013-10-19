var l = [];
	l[0] = [
		'',
		'One',
		'Two',
		'Three',
		'Four',
		'Five',
		'Six',
		'Seven',
		'Eight',
		'Nine',
		'Ten',
		'Eleven',
		'Twelve',
		'Thirteen',
		'Fourteen',
		'Fifteen',
		'Sixteen',
		'Seventeen',
		'Eighteen',
		'Nineteen'];
	l[1] = [
		'',
		'Ten',
		'Twenty',
		'Thirty',
		'Forty',
		'Fifty',
		'Sixty',
		'Seventy',
		'Eighty',
		'Ninety'
	];
	l[2] = ['Hundred'];
	l[3] = ['',
		'Thousand',
		'Million',
		'Billion'
	];


var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var amt = line.toString();
		var n = line.length;
		var ans = '';
		var teen=0;
		var t = 0;

		for(var i=n-1; i>=0; i--){
			var d = parseInt(amt[n-i-1]);
			var rank = i%3;
			if(d > 0){
				t=1;
			}
			if(rank==0){
				if(teen){
					ans += l[0][d+10];
					teen=0;
				}else{
					ans += l[0][d];
				}
				if(t){
					ans += l[3][i/3];
					t=0;
				}
			}else if(rank==2){
				if(d>0){
					ans += l[0][d] + l[2];
				}
			}else if(rank==1){
				if(d>1){
					ans += l[1][d];
				}else if(d==1){
					teen = 1;
				}
			}
		}
		console.log(ans+"Dollars");
	}
});