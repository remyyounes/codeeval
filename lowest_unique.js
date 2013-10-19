var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		var arr = line.split(" ");
		var sortedArr = arr.slice().sort();
		var min = 0, latestDup;
		for (var i = 0; i < sortedArr.length; i++) {
			if(i == sortedArr.length-1 || sortedArr[i] != sortedArr[i+1]){
				if(sortedArr[i]!=latestDup){
					min = sortedArr[i];
					break;
				}
			}else{
				latestDup = sortedArr[i];
			}
		}
		console.log(arr.indexOf(min)+1); // also takes care of 0 case
	}
});