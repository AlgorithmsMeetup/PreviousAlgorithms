/*
  Provide a move function for the red player, using the minimax algorithm.
  To do this, pass the column you want to play to the callback function.
  Make sure your algorithm runs in less than 2 seconds!

  The blue player will make random moves in return.
  If you want to try playing as the blue player, simply paste your algorithm into that file.

  Functions available (in the global scope):
    
    -- makeMove(player, column, board):
      Copies the provided board, then makes a move at the specified column for the given player.
      If no board is provided, makes the move on a copy of the current game board.
      If the move is illegal, returns "NULL" (be sure to check for this!).
      Remember, red is represented by 1, and blue is represented by -1.
    
    -- evaluateBoard(board, player):
      Returns a score expressing how good the provided board is for given player.
      Remember, red is represented by 1, and blue is represented by -1.
    
    -- printBoard(board):
      Prints a copy of the board provided to the console.
      If no board is provided, prints the current game board.
      For debugging purposes only.


*/

players.red = {
  move: function(callback) {
    var depth = 1;

    // Start with no best move, and a best value as low as possible.
    var bestMove;
    var bestScore = -Infinity;

    // For each of the seven possible moves...
    for (var move = 0; move < 7; move++) {
      
      // Whee!  Randomly pick a score for the move
      var score = Math.random(); 
      
      // If it's the best we've seen so far, remember it.
      if (score > bestScore) {
        bestMove = move;
        bestScore = score;
      }
    }

    // Return the best move we've seen.
    return callback(bestMove);
  }
};


/*
  A few hints:

    - There are 7 columns and 6 rows in the board.

    - The board is represented by an array of arrays of 1s, 0s, and -1s.  0s represent open squares.
      1s are squares owned by the red player (you), and -1s are squares owned by the blue player.

    - Try starting with depth 1, then moving to depth 2, and finally writing a recursive solution!

    - Don't forget that "makeMove" will return null for an illegal board!

    - If you want to time how long it takes for your function to run, use the following code:

        var startTime = Date.now();
        ~~your algorithm here~~
        console.log("Time to make move (in miliseconds): Date.now() - startTime");
        return callback(yourMove);

  If you want to improve your algorithm:

    - Can you make your move searches more efficient?
      For example, could you stop searching after a certain point?
      Or perhaps remember which moves you've already analyzed?

    - Can you improve your board-evaluation function?  Try playing around with the function below

*/



/* ---------------------------------------------------------------------------------------- */
/* You shouldn't edit below this line until you've finished writing your minimax algorithm! */
/* ---------------------------------------------------------------------------------------- */


var squareValues = [
  [3, 4, 5, 7, 5, 4, 3],
  [4, 6, 8, 10,8, 6, 4],
  [5, 8, 11,13,11,8, 5],
  [5, 8, 11,13,11,8, 5],
  [4, 6, 8, 10,8, 6, 4],
  [3, 4, 5, 7, 5, 4, 3]
];

var evaluateBoard = function(b, player) {

  var row, col, squareColor;
  // check rows
  for(row = 0; row < 6; row++) {
    for (col = 0; col < 4; col++) {
      squareColor = b[row][col]
      if (squareColor) { // four in a row of zeros doesn't count.
        if (b[row][col+1] === squareColor && b[row][col+2] === squareColor && b[row][col+3] === squareColor) {
          return 1000 * squareColor * player;
        }
      }
    }
  }
  // check columns
  for(col = 0; col < 7; col++) {
    for (row = 0; row < 3; row++) {
      squareColor = b[row][col]
      if (squareColor) { // four in a row of zeros doesn't count.
        if (b[row+1][col] === squareColor && b[row+2][col] === squareColor && b[row+3][col] === squareColor) {
          return 1000 * squareColor * player;
        }
      }
    }
  }
  // check NW-SE diagonals
  for(col = 0; col < 4; col++) {
    for (row = 0; row < 3; row++) {
      squareColor = b[row][col]
      if (squareColor) { // four in a row of zeros doesn't count.
        if (b[row+1][col+1] === squareColor && b[row+2][col+2] === squareColor && b[row+3][col+3] === squareColor) {
          return 1000 * squareColor * player;
        }
      }
    }
  }
  // check SW-NE diagonals
  for(col = 0; col < 4; col++) {
    for (row = 3; row < 6; row++) {
      squareColor = b[row][col]
      if (squareColor) { // four in a row of zeros doesn't count.
        if (b[row-1][col+1] === squareColor && b[row-2][col+2] === squareColor && b[row-3][col+3] === squareColor) {
          return 1000 * squareColor * player;
        }
      }
    }
  }

  // Otherwise, evaluate the board based on the chart above.
  var total = 0
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      total += b[row][col]*squareValues[row][col]*player;
    }
  }
  return total;

};