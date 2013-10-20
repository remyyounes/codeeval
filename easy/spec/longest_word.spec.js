describe("SentenceExaminer", function() {
  var SentenceExaminer = require("../longest_word.js").SentenceExaminer;

  beforeEach(function() {
    se = new SentenceExaminer();
  });

  it('should return the longest word in a sentence', function(){
    expect(se.getLongestWord("I just came back from Europe")).toBe("Europe");
  });

});