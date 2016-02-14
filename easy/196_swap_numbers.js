const fs = require('fs');
const swapExtremities = s => {
  const len = s.length;
  return `${s[len - 1]}${s.slice(1, len - 1)}${s[0]}`;
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  if (line !== '') {
    console.log(line.split(' ').map(swapExtremities).join(' '));
  }
});
