describe('HelloWorld', () => {
  const MoveFinder = require('../180_knight_moves.js');
  var moveFinder = null;
  beforeEach(() => {
    moveFinder = new MoveFinder();
  });

  it('parses line into {x, y}', () => {
    const line = 'a1';
    const result = moveFinder.parseLine(line);
    const expected = [0, 0];
    expect(result).toEqual(expected);
  });

  it('prints a position', () => {
    var result = moveFinder.printPosition([0, 0]);
    expect(result).toEqual('a1');
  });

  it('validates good ranges', () => {
    const result = moveFinder.validateRange(0);
    expect(result).toEqual(true);
  });

  it('rejects bad ranges', () => {
    const result = moveFinder.validateRange(8);
    expect(result).toEqual(false);
  });

  it('validates positions', () => {
    const position = [0, 0];
    const result = moveFinder.validatePosition(position);
    const expected = true;
    expect(result).toEqual(expected);
  });

  it('permutes arrays in tuples', () => {
    const result = moveFinder.permute([-2, -1, 1, 2]);
    const expected = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];
    expect(result).toEqual(expected);
  });

  it('finds all possible moves, even the bad ones', () => {
    const result = moveFinder.findAllMoves([0, 2]);
    const expected = [
      [-2, 1],
      [-2, 3],
      [-1, 0],
      [-1, 4],
      [1, 0],
      [1, 4],
      [2, 1],
      [2, 3],
    ];
    expect(result).toEqual(expected);
  });

  it('finds all valid moves', () => {
    const result = moveFinder.findAllValidPositions([0, 2]);
    const expected = [
      [1, 0],
      [1, 4],
      [2, 1],
      [2, 3],
    ];
    expect(result).toEqual(expected);
  });

  it('prints positions', () => {
    const result = moveFinder.printPositions([[0, 0], [1, 1], [2, 2]]);
    const expected = 'a1 b2 c3';
    expect(result).toEqual(expected);
  });
});
