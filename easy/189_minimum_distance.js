const fs = require('fs');
const addFn = (fn, list) => list.reduce( (memo, n, i) => {
  return memo + fn(n, i);
}, 0);
const getDistance = (home, house) => {
  return Math.abs(house - home);
};
const countDistances = (houses, home) => addFn(getDistance.bind(null, home), houses);
const findMin = list => list.reduce( (memo, n) => Math.min(memo, n), Infinity);
const findMax = list => list.reduce( (memo, n) => Math.max(memo, n), -Infinity);
const findHome = houses => {
  const min = findMin(houses);
  const max = findMax(houses);
  var counts = [];
  var i;
  for (i = min; i <= max; i++) {
    counts.push(countDistances(houses, i));
  }
  return findMin(counts);
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  if (line !== '') {
    console.log(
      findHome(line.split(' ').slice(1).map( x => Number(x) ))
    );
  }
});
