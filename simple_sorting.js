var quickSort = function(arr){
	if(arr.length <= 1) {return arr;}
	var pIdx = parseInt(arr.length / 2);
	var pivot = arr[pIdx];
	var sm = [];
	var xl = [];
	for(var i=0; i<arr.length; i++){
		if( i != pIdx ){
			if(parseFloat(arr[i])>pivot){
				xl.push(arr[i]);
			}else{
				sm.push(arr[i]);
			}
		}
	}
	return quickSort(sm).concat(pivot).concat(quickSort(xl));
}

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
    	var l = line.split(" ");
    	var ans = quickSort(l);
        console.log(ans.join(" "));
      	return 0;
    }
});

