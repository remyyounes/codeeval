const fs = require('fs');

fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  var result;
  var i;
  var j;
  var pArrow;
  if (line !== '') {
    result = 0;
    for (i = 0; i < line.length - 4; i++) {
      j = i + 5;
      pArrow = line.slice(i, j);
      result += pArrow === '<--<<' || pArrow === '>>-->' ? 1 : 0;
    }
    console.log(result);
  }
});
