describe('183 MaxRangeSum', () => {
  const MaxRangeSum = require('../186_max_range_sum.js');
  var details = null;
  beforeEach(() => {
    details = new MaxRangeSum();
  });

  it('processes input into lines', () => {
    const line = '5;4 2 8 -2 4 -5 -2';
    const result = details.processCase(line);
    const expected = 16;
    expect(result).toEqual(expected);
  });
});
