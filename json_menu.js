var fs = require("fs");
var jData, ans, item;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){ 
	if(line!=""){
		jData = JSON.parse(line);
		ans = 0;
		for (var i = 0; i < jData.menu.items.length; i++){
			item = jData.menu.items[i];
			if(item != null && "label" in item){
				ans += parseInt(item.id);
			}
		}
		console.log(ans);
	}
});