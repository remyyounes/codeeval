const fs = require('fs');

const times = (n, fn) => {
  var memo = [];
  var i;
  for (i = 1; i < n; i++) {
    memo.push(fn(i));
  }
  return memo;
};

const toBin = n => (n >>> 0).toString(2);
const getBinaries = n => times(n + 1, toBin);
const getZeroes = bin => bin.replace(/1/g, '').length;


fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  var binaries;
  var args;
  var zeroes;
  if (line !== '') {
    args = line.split(' ').map(x => Number(x));
    binaries = getBinaries(args[1]);
    zeroes = args[0];
    console.log(
      binaries.reduce(
        (memo, bin) => {
          return memo + (getZeroes(bin) === zeroes ? 1 : 0);
        },
        0
      )
    );
  }
});
