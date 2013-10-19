var ans = 0;
for(var p=0, i=0; p < 1000; i++){
	for(var c=2; c <= i-1; c++){
		if( i%c == 0){
			break;
		} 
	}
	if(c == i){
		p++;
		ans += i;
	}
}
console.log(ans);
