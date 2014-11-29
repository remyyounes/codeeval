// You are given a text. Write a program which outputs its lines according to the following rules:
//
// If line length is ≤ 55 characters, print it without any changes.
// If the line length is > 55 characters, change it as follows:
// Trim the line to 40 characters.
// If there are spaces ‘ ’ in the resulting string, trim it once again to the last space (the space should be trimmed too).
// Add a string ‘... <Read More>’ to the end of the resulting string and print it

var trimLastSpace = function(text, trimLength) {
  text = text.slice(0, trimLength);
  var lastSpace = text.lastIndexOf(" ");
  return lastSpace < 0 ? text : (
    text.slice(0, lastSpace));
};
var readMore = function(text, limit, trimLength) {
  return text.length <= limit ? text : (
    trimLastSpace(text, trimLength) + "... <Read More>" );
};

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
  if(line !== "") {
    console.log(readMore(line, 55, 40));
  }
});
