var Display = function() {
  this.printDigits = function(digits) {
    var rows = [];
    Array.apply(null, Array(6)).forEach( function(_, lineIdx) {
      var row = [];
      digits.forEach( function(digit){
        row.push(asciiDigits[digit][lineIdx]);
      });
      rows.push(row.join(""));
    });
    return rows.join("\n");
  }
};

var asciiDigits = [
  [
    "-**--",
    "*--*-",
    "*--*-",
    "*--*-",
    "-**--",
    "-----"
  ],
  [
    "--*--",
    "-**--",
    "--*--",
    "--*--",
    "-***-",
    "-----"
  ],
  [
    "***--",
    "---*-",
    "-**--",
    "*----",
    "****-",
    "-----"
  ],
  [
    "***--",
    "---*-",
    "-**--",
    "---*-",
    "***--",
    "-----"
  ],
  [
    "-*---",
    "*--*-",
    "****-",
    "---*-",
    "---*-",
    "-----"
  ],
  [
    "****-",
    "*----",
    "***--",
    "---*-",
    "***--",
    "-----"
  ],
  [
    "-**--",
    "*----",
    "***--",
    "*--*-",
    "-**--",
    "-----"
  ],
  [
    "****-",
    "---*-",
    "--*--",
    "-*---",
    "-*---",
    "-----"
  ],
  [
    "-**--",
    "*--*-",
    "-**--",
    "*--*-",
    "-**--",
    "-----"
  ],
  [
    "-**--",
    "*--*-",
    "-***-",
    "---*-",
    "-**--",
    "-----"
  ]
];

var display = new Display();

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line){
  if(line !== "") {
    var digits = line.replace(/[^0-9]/g, '').split("");;
    console.log( display.printDigits(digits) );
  }
});
