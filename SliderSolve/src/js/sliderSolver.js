/*

  Methods available (in the global scope):
    getSize():
      - returns the length of the side of the board (e.g. "4", for a 4x4 board.)

    findByLocation(row, col):
      - takes a location and returns the value at that location.

    findByValue(value):
      - takes an id and returns its location on the board.
      - the location is represented by a object with row and col properties.

    findEmpty():
      - returns the location of the empty square.
      - the location is represented by an object with row and col properties.

    getBoard():
      - returns a complete copy of the board.
      - this is an nxn matrix, where each square is represented by its value.
      - as you can see, the squares are numbered from 1 to n^2 - 1.
      - the empty square is represented by "null"
      - edits to this board WILL NOT propagate to the game board.

    moveByLocation(row, col):
      - moves the piece at location row and col.
      - be careful!  if you make an illegal move, your algorithm will stop.

    moveByValue(value):
      - moves the piece with the specified value.
      - be careful!  if you make an illegal move, your algorithm will stop.

    checkIfSolved():
      - returns true if you have solved the puzzle.

    checkRowIfSolved(row):
      - returns true if a row is completed
      - Zero indexed

    checkColumnIfSolved(column):
      - returns true if a column is completed have solved the puzzle.

  Methods Specifically for Console Testing

    move(idOrRow, col):
     - acts like moveByLocation + moveByValue
     - chooses how to act based on # of arguments

    printBoard():
     - acts like getBoard, but instead prints the board to console

*/

//
var cycle = function(moveArray, times, direction) {
  var i,
      j,
      length; 

  times = times || 1;
  direction = direction || 'cw';

  for( i = 0 ; i < times; i++ ) {
    var copy = moveArray.slice();
    for( j = 0; j < moveArray.length; j++) {
      if(direction === 'ccw') {
        move(copy.pop());
      } else {
        move(copy.shift());
      }
    }
  }
};

var solve = function() {
  /*
  Cycling:
  Find the null value.
  Draw a rectangle around the cycling pieces and the null value
  Put all of the cycling squares' values into a linked list
  call moveByValue on each square in the list
    cycle direction is determined by head to tail or tail to head
  */



  /*
  On a 2x2 board
  Cycle board until board is solved
  */

  /*
  On a 3x3 board
  Put 1 <- 2 in the top right corner
    If 2 is in corner, move 1 to the side
  Put 3 under 2
  Cycle outer edge once
  Put  4 <- 7 on the bottom edge
    If 7 is above 4 to the left

  cycle bottom two rows until column(0) is completed
  cycle the 2x2 board until board is solved
  */ 
  
};

// A naive approach is to alternate solving the top and 