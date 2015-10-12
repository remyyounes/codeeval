describe('183 Details', () => {
  const Details = require('../183_details.js');
  var details = null;
  beforeEach(() => {
    details = new Details();
  });

  it('processes input into lines', () => {
    const lines = 'xx..yy,x..yyy,xxx.yy';
    const result = details.parseLine(lines);
    const expected = [
      'xx..yy',
      'x..yyy',
      'xxx.yy',
    ];
    expect(result).toEqual(expected);
  });

  it('finds gap', () => {
    const line = 'xxx.yyyyy';
    const result = details.findGap(line);
    const expected = 1;
    expect(result).toEqual(expected);
  });

  it('finds gap with cavities', () => {
    const line = 'xxx...yy..y';
    const result = details.findGap(line);
    const expected = 3;
    expect(result).toEqual(expected);
  });

  it('processes a case', () => {
    const lines = 'xx..yy,x..yyy,xxx.yy';
    const result = details.processCase(lines);
    const expected = 1;
    expect(result).toEqual(expected);
  });

  it('processes a case', () => {
    const lines = 'X...Y,X..YY,X...Y,X..YY,XX.YY';
    const result = details.processCase(lines);
    const expected = 1;
    expect(result).toEqual(expected);
  });
});
