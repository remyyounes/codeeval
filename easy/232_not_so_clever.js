const fs = require('fs');

const stupidIteration = (list) => {
  var len = list.length;
  var i = 0;
  var tmp;
  while (i < len) {
    if ( list[i] > list[i + 1] ) {
      tmp = list[i + 1];
      list[i + 1] = list[i];
      list[i] = tmp;
      return list;
    }
    i++;
  }
  return list;
};

const stupidSort = (list, iterations) => {
  while ( iterations-- ) {
    list = stupidIteration(list);
  }
  return list;
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  var args;
  var numbers;
  var iterations;
  if (line !== '') {
    args = line.split(' | ');
    numbers = args[0].split(' ').map( x => Number(x) );
    iterations = args[1];
    console.log(
      stupidSort( numbers, iterations ).join(' ')
    );
  }
});
