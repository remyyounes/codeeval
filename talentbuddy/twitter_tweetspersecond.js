function tweets_per_second(tps, k) {
    var max = 0;
    var maxStillInRange = 0;
    var output = [];
    for (var i = 0; i < tps.length; i++) {
      if(tps[i] >= max ){
        max = tps[i];
        maxStillInRange = k;
      }
      if(maxStillInRange <= 0){
        max = 0;
        for(var j = Math.max(0, i-k+1); j<=i; j++){
          if(tps[j] >= max ){
            max = tps[j];
            maxStillInRange = k-(i-j);
          }
        }
      }
      output.push( max );
      maxStillInRange--;
    }
    console.log(output.join("\n"));
}

var  tps = [ 6, 9, 4, 7, 4, 1];
tweets_per_second(tps, 3);