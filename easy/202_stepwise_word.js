const fs = require('fs');
const star = i => {
  var stars = i;
  var val = '';
  while ( stars-- ) val += '*';
  return val;
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  if (line !== '') {
    const args = line.split(' ');
    const longest = args.reduce(
      (memo, item) => item.length > memo.length ? item : memo,
      ''
    );
    console.log(
      longest.split('').map(
        (item, i) => star(i) + item
      ).join(' ')
    );
  }
});
