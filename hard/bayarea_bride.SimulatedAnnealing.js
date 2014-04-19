var Node = function(x,y,num){
  this.x = x;
  this.y = y;
  this.num = num;
}

Node.prototype = {
  distanceTo: function (n){
    if(n===this) return 0;
    var a = this.x - n.x;
    var b = this.y - n.y;
    return Math.sqrt( Math.pow(a,2) + Math.pow(b,2));
  },
  toString: function(){
    return this.x + ", " + this.y;
  }
}

var Tour = function(tour){
  this.tour = tour.slice(0);
  this.distance = 0;
}

Tour.prototype = {
  getDistance: function(){
    if (this.distance == 0) {
      var tDist = 0;
      for (var i = 0; i < this.tour.length; i++) {
        var a = this.tour[i];
        var b = this.tour[0];
        if (i+1 < this.tour.length) b = this.tour[i+1];
        tDist += distances[a.num-1][b.num-1];
      }
      this.distance = tDist;
    }
    return this.distance;
  }
}

var SimulatedAnnealing = function(){}

SimulatedAnnealing.prototype = {
  acceptanceProbability: function(energy, newEnergy, temperature) {
    if (newEnergy < energy) return 1.0;
    return Math.exp((energy - newEnergy) / temperature);
  },
  getOptimalTour: function(tour){
    var temp = 10000;
    var coolingRate = 0.00003;
    var currentSolution = new Tour(tour);
    var best = currentSolution;

    while (temp > 1) {
      var newSolution = new Tour(currentSolution.tour);

      var idx1 = parseInt((newSolution.tour.length-1) * Math.random()+1);
      var idx2 = parseInt((newSolution.tour.length-1) * Math.random()+1);
      var a = newSolution.tour[idx1];
      var b = newSolution.tour[idx2];
      this.distance = 0;
      newSolution.tour[idx2] = a;
      newSolution.tour[idx1] = b;

      var currentEnergy = currentSolution.getDistance();
      var newEnergy = newSolution.getDistance();

      if (this.acceptanceProbability(currentEnergy, newEnergy, temp) > Math.random()) {
        currentSolution = new Tour(newSolution.tour);
      }
      if (currentSolution.getDistance() < best.getDistance()) {
        best = new Tour(currentSolution.tour);
      }
      temp *= 1-coolingRate;
    }
    return best.tour;
  }
}

var fs  = require("fs");
var initialTour = [];
var distances = [];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
  if (line != "") {
    var args = line.split(" | ");
    var i = args[0];
    var location  =  args[1].match(/\((.*)\)/)[1].split(", ");
    var c = new Node(location[0],location[1],initialTour.length+1);
    initialTour.push(c);
  }
})

for (var i = 0; i < initialTour.length; i++) {
  distances[i] = [];
  var a = initialTour[i];
  for (var j = 0; j < initialTour.length; j++) {
    var b = initialTour[j];
    distances[i][j] = a.distanceTo(b);
  }
}

var sa = new SimulatedAnnealing();
var ans = sa.getOptimalTour(initialTour);
if(ans[1]>ans[ans.length-1]) ans = [ans[0]].concat(ans.slice(1).reverse()); //force order
for (var i = 0; i < ans.length; i++)
  console.log(ans[i].num);