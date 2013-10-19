function validParentheses(line) 
{ 
	var opened = [];
	var p = [];
	p[')'] = '(';
	p[']'] = '[';
	p['}'] = '{';

	for (var i = 0; i < line.length; i++) {
		var c = line.charAt(i);
		if( c =='(' || c == '[' || c == '{'){
			opened.push(c);
		}else{
			if ( opened.pop() != p[c] ){
				return 'False';
			}
		}
	}
	return 'True';
}


var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		console.log(validParentheses(line));
	}
});