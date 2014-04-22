var players = {};
var outOfTime;
$(document).ready(function() {

  // Game variables.
  var board,
      width = 7,
      height = 6,
      timePerMove = 2000,
      turn;

  // Cached jQuery selectors.
  var $board = $('.board');

  var init = function() {
    // Set up the board.
    board = [];
    for (var i = 0; i < height; i++) {
      var row = [];
      for (var j = 0; j < width; j++) {
        row.push(0);
      }
      board.push(row);
    }

    turn = 1;
  };

  var render = function() {
    $board.html('');
    for (var row = 0; row < height; row++) {
      var $row = $("<div class='row'></div>");
      for (var col = 0; col < width; col++) {
        var $cell = $("<div class='cell'></div>")
        $cell.attr('row', row);
        $cell.attr('col', col);

        var piece = board[row][col];
        if (piece) {
          var $piece = $("<div class='piece'><div>")
          $piece.addClass(piece === 1 ? "one" : "two");
          $piece.appendTo($cell);
        }
        $cell.appendTo($row);
      }
      $row.appendTo($board);
    }
  };

  var placePiece = function(col, color, b) {
    b = b || board
    for (var row = height; row--;) {
      if (b[row][col] === 0) {
        b[row][col] = color;
        return;
      }
    }
    throw "Illegal move."
  };

  var checkWinner = function(b) {
    b = b || board; // By default, evaluate the actual game board.

    var row, col, color;
    // check rows
    for(row = 0; row < height; row++) {
      for (col = 0; col < width - 3; col++) {
        color = b[row][col]
        if (color) { // four in a row of zeros doesn't count.
          if (b[row][col+1] === color && b[row][col+2] === color && b[row][col+3] === color) {
            return {
              winner: color,
              squares: [[row, col], [row, col+1], [row, col+2], [row, col+3]]
            };
          }
        }
      }
    }
    // check columns
    for(col = 0; col < width; col++) {
      for (row = 0; row < height - 3; row++) {
        color = b[row][col]
        if (color) { // four in a row of zeros doesn't count.
          if (b[row+1][col] === color && b[row+2][col] === color && b[row+3][col] === color) {
            return {
              winner: color,
              squares: [[row, col], [row+1, col], [row+2, col], [row+3, col]]
            };
          }
        }
      }
    }
    // check NW-SE diagonals
    for(col = 0; col < width - 3; col++) {
      for (row = 0; row < height - 3; row++) {
        color = b[row][col]
        if (color) { // four in a row of zeros doesn't count.
          if (b[row+1][col+1] === color && b[row+2][col+2] === color && b[row+3][col+3] === color) {
            return {
              winner: color,
              squares: [[row, col], [row+1, col+1], [row+2, col+2], [row+3, col+3]]
            };
          }
        }
      }
    }
    // check SW-NE diagonals
    for(col = 0; col < width - 3; col++) {
      for (row = 3; row < height; row++) {
        color = b[row][col]
        if (color) { // four in a row of zeros doesn't count.
          if (b[row-1][col+1] === color && b[row-2][col+2] === color && b[row-3][col+3] === color) {
            return {
              winner: color,
              squares: [[row, col], [row-1, col+1], [row-2, col+2], [row-3, col+3]]
            };
          }
        }
      }
    }
    return {winner: 0};
  }

  var endGame = function(result) {
    if (result.winner === 0) {
      console.log("TIE GAME");
    } else {
      console.log("PLAYER " + result.winner + " WINS.")
    }
  }

  var copyBoard = function(b) {
    b = b || board; // By default, copy the actual game board.
    var output = [];
    for (var row = 0; row < height; row++) {
      output.push(b[row].slice());
    }
    return output;
  }

  var printBoard = function() {
    for (var i = 0; i < height; i++) {
      var output = "";
      for (var j = 0; j < width; j++) {
        if (board[i][j]) {
          output += board[i][j] === 1 ? "x " : "o ";
        } else {
          output += "- ";
        }
      }
      console.log(output);
    }
  };

  var requestMove = function() {
    // Don't let two moves be made.
    var moveProvided = false;

    console.log("requesting move for player", turn);

    // Function to be called with a move.
    var attemptMove = function(col) {
      clearTimeout(outOfTime);
      if (!moveProvided) {
        moveProvided = true;
        try {
          if (col === -1) {
            console.log("oops! looks like you didn't move in time.  making a random move.");
            throw "didn't move in time";
          } else {
          }
          placePiece(col, turn);
        // If the player's move is illegal...
        } catch (ex) {
          console.log("oops! looks like that move doesn't work.  making a random move.");

          // Find all legal columns.
          var legal = [];
          for (var col = 0; col < width; col++) {
            if (board[0][col] === 0) {
              legal.push(col);
            }
          }
          // If there are any, make a random legal move.
          if (legal.length) {
            var choice = Math.floor(Math.random()*legal.length)
            placePiece(legal[choice], turn);

          // Otherwise, end the game in a draw.
          } else {
            endGame(0)
          }
        }
        render();
        var result = checkWinner();
        if (result && result.winner) {
          endGame(result);
        } else {
          turn *= -1;
          requestMove();
        }
      }
    }

    // Call the move function of the player who's turn it is.
    players[turn === 1 ? "red" : "blue"].move(attemptMove);
    //
    clearTimeout(outOfTime);
    outOfTime = setTimeout(function(){ attemptMove(-1);}, timePerMove);
  };

  window.printBoard = printBoard;
  window.copyBoard = copyBoard;
  window.makeMove = function(turn, col, board) {
    var board = copyBoard(board);
    try {
      placePiece(col, turn, board);
    } catch (ex) {
      return null;
    }
    return board;
  };

  // Init.
  setTimeout((function(){
    init();
    render();
    requestMove();
  }).bind(this), 500);

});







