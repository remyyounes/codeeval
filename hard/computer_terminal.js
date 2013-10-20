var ComputerTerminal = function(){
  this.screen = [];
  this.screenSize = 10;
  this.setOverwriteMode('false')
  this.clearScreen();
  this.resetCursor();
  this.emptyChar = ' ';
};

ComputerTerminal.prototype = {
  run: function(cmds){
    var currentChar = '';
    cmds = cmds.split('');
    while( cmds.length ){
      currentChar = cmds.shift();
      if(currentChar === '^'){
        cmds = this.executeCommand( cmds );
      }else{
        this.writeScreen(currentChar);
      }
    }
  },

  writeScreen: function(symbol){
    var i = this.cursor[0];
    var j = this.cursor[1];
    if(!this.overwrite){
      this.shiftRight();
    }
    this.screen[i][j] = symbol;
    this.right();
  },

  shiftRight: function(){
    for (var i = this.screenSize - 1; i > this.cursor[1]; i--) {
      this.screen[this.cursor[0]][i] = this.screen[this.cursor[0]][i-1];
    };
  },

  printScreen: function(){
    for (var i = 0; i < this.screenSize; i++) {
      console.log(this.screen[i].join(''));
    };
  },

  executeCommand: function( cmds ){
    var cmd = cmds.shift();
    switch(cmd){
      case 'c':
        this.clearScreen();
        break;
      case 'h':
        this.resetCursor();
        break;
      case 'b':
        this.cursorStartRow();
        break;
      case 'd':
        this.down();
        break;
      case 'u':
        this.up();
        break;
      case 'l':
        this.left();
        break;
      case 'r':
        this.right();
        break;
      case 'e':
        this.eraseEnd();
        break;
      case 'i':
        this.setOverwriteMode(false);
        break;
      case 'o':
        this.setOverwriteMode(true);
        break;
      case '^':
        this.writeScreen('^');
        break;
      default:
        // can only be goTo command at this point
        var row = cmd;
        var col = cmds.shift();
        this.goTo(row, col);
    }
    return cmds;
  },

  //   ^c - clear the entire screen; the cursor row and column do not change 
  clearScreen: function(){
    for (var i = 0; i < this.screenSize ; i++) {
      this.screen[i] = [];
      for (var j = 0; j < this.screenSize; j++) {
        this.screen[i][j] = this.emptyChar; 
      };
    };
  },
  // ^h - move the cursor to row 0, column 0; the image on the screen is not changed 
  resetCursor: function(){
    this.cursor = [0,0];
  },
  // ^b - move the cursor to the beginning of the current line; the cursor row does not change 
  cursorStartRow: function(){
    this.cursor[1] = 0;
  },
  // ^d - move the cursor down one row if possible; the cursor column does not change 
  down: function(){
    var row = this.cursor[0];
    if(row < this.screenSize-1) row++;
    this.cursor[0] = row;
  },
  // ^u - move the cursor up one row, if possible; the cursor column does not change 
  up: function(){
    var row = this.cursor[0];
    if(row) row--;
    this.cursor[0] = row;
  },
  // ^l - move the cursor left one column, if possible; the cursor row does not change 
  left: function(){
    var col = this.cursor[1];
    if(col) col--;
    this.cursor[1] = col;
  },
  // ^r - move the cursor right one column, if possible; the cursor row does not change 
  right: function(){
    var col = this.cursor[1];
    if(col < this.screenSize-1) col++;
    this.cursor[1] = col;
  },
  // ^e - erase characters to the right of, and including, the cursor column on the cursor's row; the cursor row and column do not change 
  eraseEnd: function(){
    for (var i = this.cursor[0]; i < this.screen.length; i++) {
      this.screen[this.cursor[1]][i] = this.emptyChar;
    };
  },
  // ^i - enter insert mode 
  // ^o - enter overwrite mode 
  setOverwriteMode: function(overwrite){
    this.overwrite = overwrite;
  },
  // ^DD - move the cursor to the row and column specified; each D represents a decimal digit; the first D represents the new row number, and the second D represents the new column number 
  goTo: function(row, col){
    this.cursor = [row, col];
  }
};

var ct = new ComputerTerminal();
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
  if (line !== "") ct.run(line);
});
ct.printScreen();

module.exports.ComputerTerminal = ComputerTerminal;