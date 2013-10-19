for(var i=9; i>=0; i--){
	for(var j=9; j>=0; j--){
		n = i*101 + j*10;
		for(var c=2; c <= n-1; c++){
			if( n%c == 0){
				break;
			} 
		}
		if(c == n){
			console.log( n );
			return;
		}
	}
}
