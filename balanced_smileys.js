var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
	if (line != "") {
	line = line.replace(/:\(/g,'[');
	line = line.replace(/:\)/g,']');
	line = line.replace(/[a-z: ]*/, '');
	var min = 0;
	var max = 0;
	for (var i = 0; i < line.length; i++) {
		var c = line[i];
		switch(c) {
			case '(':
				max++;
				min++
				break;
			case ')':
				max--;
				min--;
				break;
			case '[':
				max++;
				break;
			case ']':
				min--;
				break;
		}
		min = Math.max(0,min);
		if(max < 0){
			break;
		}
	};
	var ans = (min == 0 && max >= 0)?'YES':'NO';
	console.log(ans);
	}
});
