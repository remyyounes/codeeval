function detectCycle(line) 
{ 
	var l = line.split(' ');
	var n = l.length;
	
	for(var i=1; i<n; i++){
		for(var j=i-1; j > 0; j--){
			var k=i-j+1;
			if(k>j || j < i/2){
				break;
			}
			var a = l.slice(j - k, j);
			var b = l.slice(j, i+1);
			if(a.join()==b.join()){
				return a.join(" ");
			}
		}		
	}
	return '';
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line != ""){ console.log(detectCycle(line)) };
});