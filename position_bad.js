function codeEvalExecute(line) 
{ 
	var l = line.split(",");
	var n = parseInt(l[0]),
		p1 = parseInt(l[1]) - 1,
		p2 = parseInt(l[2]) - 1;
	n = n.toString(2);
	return  (n.charAt(-p1) == n.charAt(-p2));
}