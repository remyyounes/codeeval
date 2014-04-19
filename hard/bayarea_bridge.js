var Bridge = function(i, points){
  this.position = i;
  this.points = points;
}

Bridge.prototype = {
  latitudeA: function(){
    return this.points[1];
  },
  latitudeB: function(){
    return this.points[3];
  }
}

var BridgeComputer =  function () {}


BridgeComputer.prototype = {
  getLIS: function(bridges){
    var longest = [];
    var L = [];
    L[0] = [bridges[0]];
    for (var i = 1; i < bridges.length; i++) {
      L[i] = [];
      for (var j = 0; j < i; j++)
        if( L[i].length < (L[j].length + 1) && bridges[j].latitudeB() < bridges[i].latitudeB()  )
          L[i] = L[j].slice(0);
      L[i].push(bridges[i]);
      if(L[i].length > longest.length) longest = L[i];
    }
    return longest;
  }
}

bc = new BridgeComputer();


var bridges = [];
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
  if (line !== ""){
    var values = line.split(": ");
    var i = values[0];
    var points = line.match(/(\-*\d+\.\d+)/g);
    bridges.push( new Bridge(i, points) );
  } 
});

bridges.sort(function(a, b){
  return a.latitudeA() > b.latitudeA();
});
var results = bc.getLIS( bridges );
results.sort(function(a,b){
  return a.position >  b.position;
});

for (var i = 0; i < results.length; i++) {
  console.log(results[i].position);
};
