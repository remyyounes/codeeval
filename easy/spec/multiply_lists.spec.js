describe("ListOperator", function() {
  var ListOperator = require("../multiply_lists.js").ListOperator;

  beforeEach(function() {
    lo = new ListOperator();
  });

  it('multiply elements of two lists', function(){
    var a = [1, 2, 3];
    var b = [4, 5, 6];
    var expection = [4, 10, 18];
    expect( lo.multiply(a, b) ).toEqual( expection );
  });

});