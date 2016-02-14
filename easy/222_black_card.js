const fs = require('fs');

const excludePlayer = (players, count) => {
  players.splice(count % players.length - 1, 1);
  return players;
};

const play = (players, count) => {
  while (players.length > 1) {
    players = excludePlayer(players, count);
  }
  return players[0];
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  var args;
  var count;
  var players;
  if (line !== '') {
    args = line.split(' | ');
    players = args[0].split(' ');
    count = Number(args[1]);
    console.log(play(players, count));
  }
});
