function multTables(x) 
{ 
	var r = 0,
		ans = "";
	for(var i=1; i<=x; i++){
		for(var j=1; j<=x; j++){
			n = i*j;
			if(j>1){
				ans += ("    " + n).slice(-4);
			}else{
				ans += n;
			}
		}
		ans += "\n";
	}
	return ans;
}

console.log(multTables(12));