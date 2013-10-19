var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
    	var l = line.split(";");
    	var a = l.shift();
    	var b = l.shift()

    	var req_a = a.split("://");
    	var req_b = b.split("://");
    	var ans = "True";

    	var scheme_a = req_a[0].toString();
    	var scheme_b = req_b[0].toString();
    	if(scheme_a.toLowerCase() != scheme_b.toLowerCase()){
    		ans = "False";
    	}else{
	    	//1
	    	var parms_a = req_a[1].split("/");
	    	var parms_b = req_b[1].split("/");
	    	var host_a = parms_a.splice(0,1)[0];
	    	var host_b = parms_b.splice(0,1)[0];
	    	host_a = host_a.replace(/:80$/, "");
	    	host_b = host_b.replace(/:80$/, "");
	    	host_a = host_a.replace(/:$/, "");
	    	host_b = host_b.replace(/:$/, "");

	    	//2
	    	if(host_a.toLowerCase() != host_b.toLowerCase() ){
	    		ans = "False";
	    	}else if( parms_a.length > 0 && parms_b.length > 0){
	    		parms_a = parms_a.join();
		    	parms_b = parms_b.join();
		    	if(decodeURI(parms_a) != decodeURI(parms_b)){
		    		ans = "False";
		    	}	
	    	}
    	}
    	console.log(ans);
        return 0;
    }
});