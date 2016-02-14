const add = list => list.reduce( (memo, n) => memo + n, 0);
const addFn = (fn, list) => list.reduce( (memo, n, i) => memo + fn(n, i), 0);
