describe("MorseDecoder", function(){
  var MorseDecoder = require("../morse_code.js").MorseDecoder;

  beforeEach(function() {
    md = new MorseDecoder();
  });

  it('can decode single letters', function(){
    expect( md.decode(".-.") ).toEqual("R");
  });

  it('can decode a word', function(){
    expect( md.decodeWord(".-. . -- -.--") ).toEqual("REMY");
  });

  it('can decode a sentence', function(){
    expect( md.decode(".-. . -- -.--  .-.. .. -.- . ...  .--- ...") ).toEqual("REMY LIKES JS");
  });

});