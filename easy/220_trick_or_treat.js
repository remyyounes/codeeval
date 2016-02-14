const fs = require('fs');
const candiesPerCostume = {
  Vampires: 3,
  Zombies: 4,
  Witches: 5,
};

const parseToken = token => {
  const parsed = token.split(': ');
  return {
    key: parsed[0],
    value: parseInt(parsed[1], 10),
  };
};

const getCandies = costume => {
  const parsed = parseToken(costume);
  return candiesPerCostume[parsed.key] * parsed.value;
};


fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  if (line !== '') {
    const costumes = line.split(', ');
    const houses = costumes.splice( costumes.length - 1, 1)[0];
    const numHouses = parseToken(houses).value;

    const results = costumes.reduce((memo, c) => {
      return {
        children: memo.children + parseToken(c).value,
        candies: memo.candies + getCandies(c),
      };
    }, {
      candies: 0,
      children: 0,
    });

    console.log(Math.floor(results.candies * numHouses / results.children));
  }
});
