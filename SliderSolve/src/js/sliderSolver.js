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

    move(idOrRow, col):
     - acts like moveByLocation + moveByValue
     - chooses how to act based on # of arguments

    checkIfSolved():
      - returns true if you have solved the puzzle.

    checkRowIfSolved(row):
      - returns true if a row is completed
      - Zero indexed

    checkColumnIfSolved(column):
      - returns true if a column is completed have solved the puzzle.

    printBoard():
     - acts like getBoard, but instead prints the board to console.

*/


var solve = function() {

};

// A naive approach is to alternate solving the top and