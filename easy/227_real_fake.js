const fs = require('fs');

const addFn = (fn, list) => list.reduce( (memo, n, i) => memo + fn(n, i), 0);
const double = (n, i) => ((i + 1) % 2 === 0 ? n : n * 2);
const validateCard = (list) => addFn(double, list) % 10 === 0 ? 'Real' : 'Fake';
const cleanInput = (i) => i.replace(/\s/g, '').split('').map(x => Number(x));
fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  if (line !== '') {
    console.log(
      validateCard(
        cleanInput(line)
      )
    );
  }
});
