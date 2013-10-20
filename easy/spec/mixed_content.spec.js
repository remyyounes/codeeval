describe("ContentSorter", function() {
  var ContentSorter = require("../mixed_content.js").ContentSorter;

  beforeEach(function() {
    cs = new ContentSorter();
  });

  it('sorts numbers from words. (alpha 1st)', function(){
    var a = [1, 'a', 2, "b", 3, "c"];
    var expection = "a,b,c|1,2,3";
    expect( cs.sortNumbers(a) ).toEqual( expection );
  });

});