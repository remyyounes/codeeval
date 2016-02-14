const fs = require('fs');

const processLists = lists => lists.reduce( (memo, list, i) => {
  const teams = list.split(' ');
  return teams.reduce( (m, t) => {
    m[t] = m[t] ? m[t].concat([i + 1]) : [ i + 1 ];
    return m;
  }, memo);
}, {});

const numericSort = (a, b) => Number(a) > Number(b) ? 1 : -1;

const printResults = results => {
  return Object.keys(results).sort(numericSort).map(
    country => country + ':' + results[country].join(',')
  ).join('; ') + ';';
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  if (line !== '') {
    console.log(
      printResults(processLists(line.split(' | ')))
    );
  }
});
