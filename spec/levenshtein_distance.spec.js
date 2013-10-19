
describe("WordSet", function() {

  var WordSet = require("../levenshtein_distance.js").WordSet;
  beforeEach(function() {
    wordSet = new WordSet();
  });

  it('is empty when initialized', function(){
    expect(wordSet.size()).toBe(0);
  });

  it("grows when an element is added to it", function() {
    wordSet.add('word');
    expect(wordSet.size()).toBe(1);
  });

  it('holds has a word when it is added to it', function(){
    var word = "hello";
    wordSet.add(word);
    expect(wordSet.has(word)).toBe(true);
  });

  it('shrinks in size when a word is shifted', function(){
    var word = "hello";
    var word2 = "world";
    wordSet.add(word);
    wordSet.add(word2);
    wordSet.shift();
    expect(wordSet.size()).toBe(1);
  });

  it('removes the shifted word from its collection', function(){
    wordSet.add("hello");
    wordSet.add("small");
    wordSet.add("world");
    var shiftedWord = wordSet.shift();
    expect(wordSet.has(shiftedWord)).toBe(false);
  });

  it('returns undefined when shifting an empty collection', function(){
    expect(wordSet.shift()).toBeUndefined();
  });

  it('doesnt grow when adding a word that is already present', function(){
    var word = "hello";
    wordSet.add(word);
    wordSet.add(word);
    expect(wordSet.size()).toBe(1);
  });

});