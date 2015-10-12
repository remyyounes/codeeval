describe("Chardonnay", function() {
  var MaxFinder = require("../208_highest_score.js");

  beforeEach(function() {
    maxFinder = new MaxFinder();
  });

  it('parses line into rows', function() {
    var testCase = "72 64 150 | 100 18 33 | 13 250 -6";
    var result = maxFinder.parseLine(testCase);
    expect(result[0]).toEqual([72,64,150]);
    expect(result[1]).toEqual([100,18,33]);
    expect(result[2]).toEqual([13,250,-6]);
  });

  it('finds the highest number', function() {
    var testCase = "72 64 150 | 100 18 33 | 13 250 -6";
    var max = maxFinder.processCase(testCase);
    expect(max).toEqual([100, 250, 150]);
  });


});
