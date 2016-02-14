const fs = require('fs');

const getDirection = (O, P, Q, R) => {
  var direction = '';
  if (P !== R) direction += (P < R) ? 'N' : 'S';
  if (O !== Q) direction += (O < Q) ? 'E' : 'W';
  return direction ? direction : 'here';
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  if (line !== '') {
    const args = line.split(' ');
    const O = parseInt(args[0], 10);
    const P = parseInt(args[1], 10);
    const Q = parseInt(args[2], 10);
    const R = parseInt(args[3], 10);
    console.log(getDirection(O, P, Q, R));
  }
});
