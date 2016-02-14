const fs = require('fs');

const countBugs = (expected, test) => expected.split('').reduce(
  (memo, token, i) => memo + (expected[i] === test[i] ? 0 : 1),
  0);

const getStatus = (bugs) => {
  var status = '';
  if ( bugs <= 0) status = 'Done';
  else if ( bugs <= 2) status = 'Low';
  else if ( bugs <= 4) status = 'Medium';
  else if ( bugs <= 6) status = 'High';
  else if ( bugs >= 7 ) status = 'Critical';
  return status;
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  var args;
  if (line !== '') {
    args = line.split(' | ');
    console.log(getStatus(countBugs(args[0], args[1])));
  }
});
