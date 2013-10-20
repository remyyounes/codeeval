describe("ElementSwapper", function() {
  var ElementSwapper = require("../swap_elements.js").ElementSwapper;

  beforeEach(function() {
    es = new ElementSwapper();
  });

  it('should swap a tuple of indices in a list', function(){
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var i = 0;
    var j = 8;
    var exp = [ 9, 2, 3, 4, 5, 6, 7, 8, 1 ];
    expect( es.swapIdx(nums, i, j) ).toEqual(exp);
  });

  it('should swap multiple set of indices in a list', function(){

    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var swaps = ["0-1", "1-3"];
    var exp = [2, 4, 3, 1, 5, 6, 7, 8, 9];

    expect( es.swap(nums, swaps) ).toEqual(exp);
  });

});