
describe("RomanConverter", function() {
  var RomanConverter = require("../roman_numerals.js").RomanConverter;

  beforeEach(function() {
    rc = new RomanConverter();
  });

  it('returns the same value', function(){
    expect(rc.convert(10)).toBe('X');
  });

  it('gets the largest roman character for an interger', function(){
    expect(rc.getLargestRoman(11)).toBe('X');
    expect(rc.getLargestRoman(101)).toBe('C');
  });

});