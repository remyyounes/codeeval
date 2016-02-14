const fs = require('fs');

const ranks = { 'A': 14, 'K': 13, 'Q': 12, 'J': 11 };

const rankToValue = rank => {
  const a = ranks[rank] ? ranks[rank] : Number(rank);
  return a;
};

const getValue = (card, trumpSuite) => {
  const trump = card.suite === trumpSuite;
  return rankToValue(card.rank) + (trump ? 100 : 0);
};

const parseCard = card => ({
  rank: card.slice(0, card.length - 1),
  suite: card.slice(card.length - 1),
});

const play = (cards, trump) => {
  const cardA = getValue(parseCard(cards[0]), trump);
  const cardB = getValue(parseCard(cards[1]), trump);
  return (cardA === cardB)
    ? cards.join(' ')
    : (cardA > cardB) ? cards[0] : cards[1];
};


fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  var args;
  if (line !== '') {
    args = line.split(' | ');
    console.log(
      play(args[0].split(' '), args[1])
    );
  }
});
