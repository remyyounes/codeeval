const fs = require('fs');

const getSeconds = (h, m, s) => Number(h) * 3600 + Number(m) * 60 + Number(s);

const getTime = (timeString) => {
  const time = timeString.split(':');
  return getSeconds( time[0], time[1], time[2] );
};

const byTime = (a, b) => getTime(a) > getTime(b) ? -1 : 1;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  if (line !== '') {
    console.log(
      line
        .split(' ')
        .sort(byTime)
        .join(' ')
    );
  }
});
