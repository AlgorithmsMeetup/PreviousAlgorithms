players.blue = {
  move: function(callback) {
    var bestMove;
    var bestValue = -Infinity;

    for (var move = 0; move < 7; move++) {
      var withMove = makeMove(-1, move);
      if (withMove) { // An illegal move will return `null` for the new board.
        var value = evaluateBoard(withMove, -1)
        if (value > bestValue) {
          bestValue = value;
          bestMove = move;
        }
      }
    }
    setTimeout(function() {
      callback(bestMove);
    }, 500);
  }
}