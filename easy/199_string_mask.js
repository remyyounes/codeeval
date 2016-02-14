const fs = require('fs');
const processCase = (letter, upper) =>
  parseInt(upper, 10) ? letter.toUpperCase() : letter.toLowerCase();

const maskString = (string, mask) => {
  return string.split('').reduce( (memo, value, i) => {
    return memo + processCase(value, mask[i]);
  }, '');
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  if (line !== '') {
    const args = line.split(' ');
    console.log(maskString(args[0], args[1]));
  }
});
