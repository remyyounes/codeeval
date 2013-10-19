function codeEvalExecute(line) 
{ 
	var l = line.split(",");
	var s = l[0];
	var e = l[1];
	var n = s.length;
	var m = e.length;
	var r = s.indexOf(e);
	var ans = 0;

	if( r == n-m && n>=m){
		ans=1;
	}
	return ans;
}