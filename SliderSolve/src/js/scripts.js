$(document).on('ready', function() {

  //
  // Globals.
  //

  var size = 3;
  var moveInterval = 400;

  var squares; // map to find squares in O(1) - id 12 is at array position 12.
  var board; // array of squares.
  var empty; // which square is currently empty.
  var renderQueue; // An array of board states, to animate.
  var eventLoopTimeout;
  var error;
  var running;

  //
  // Cached selectors.
  //

  var $board = $('.board');
  var $error = $('.error');
  var $sizeSlider = $('.size');
  var $speedSlider = $('.speed');
  var $run = $('.run');
  var $reset = $('.reset');


  //
  // Private game functions:
  //

  var initBoard = function() {
    // Generate board.
    var id = 1;
    board = [];
    for (var i = 0; i < size; i++) {
      var row = [];
      for (var j = 0; j < size; j++) {
        if (i === size - 1 && j === size - 1) {
          row.push(null);
          empty = {row: size - 1, col: size - 1};
        } else {
          row.push(id);
          squares[id++] = {row: i, col: j};
        }
      }
      board.push(row);
    }

    // Shuffle board.
    for (var s = size*size*size*1000; s--;) {
      var rand = Math.random();
      var r = empty.row;
      var c = empty.col;
      if (rand < 0.25) {
        r--;
      } else if (rand < 0.5) {
        r++;
      } else if (rand < 0.75) {
        c--;
      } else {
        c++;
      }
      try {
        movePiece(r, c);
      } catch (ex) {
        s++;
      }
    }

  };

  var renderBoard = function(boardToRender) {
    $board.html('');
    for(var i = 0; i < size; i++) {
      var $row = $('<div class="row"></div>');
      for (var j = 0; j < size; j++) {
        var value = boardToRender[i][j];
        var $square = $('<div class="square"></div>');
        if (value) {
          $($square).text(value);
        } else {
          $($square).text("-");
          $($square).addClass("empty");
        }
        $($square).attr("row", i);
        $($square).attr("col", j);
        $row.append($square);
      }
      $($board).append($row);
    }
  };

  var movePiece = function(row, col) {
    if (row < 0 || row >= size || col < 0 || col >= size) {
      return false;
    }
    var dRow = Math.abs(empty.row - row);
    var dCol = Math.abs(empty.col - col);

    // We are trying to move a square exactly one away from the target.
    if (dRow + dCol === 1) {
      var val = board[row][col];
      board[empty.row][empty.col] = val;
      board[row][col] = null;
      squares[val] = {row: empty.row, col: empty.col};
      empty = {row: row, col: col};
      return true;
    // If we are not, we can't move this square.
    } else {
      return false;
    }
  };

  var isSolved = function() {
    var value = 1;
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        if (i === size - 1 && j === size - 1) {
          return true;
        } else if (board[i][j] !== value++) {
          return false;
        }
      }
    }
  };

  var startRenderLoop = function() {
    var step = function() {
      if (renderQueue.length) {
        var board = renderQueue.shift();
        renderBoard(board);
        if (running) {
          eventLoopTimeout = setTimeout(step, moveInterval);
        }
      }
    };
    step();
  };

  var stopRenderLoop = function() {
    clearTimeout(eventLoopTimeout);
    renderQueue = [];
  };

  var reset = function() {
    stopRenderLoop();
    squares = [];
    error = false;
    running = false;
    initBoard();
    renderBoard(board);
  };

  //
  // Functions available for the solver.
  //

  window.getBoard = function() {
    var copy = [];
    for (var i = 0; i < size; i++) {
      var row = [];
      for (var j = 0; j < size; j++) {
        row.push(board[i][j]);
      }
      copy.push(row);
    }
    return copy;
  };

  window.getSize = function() {
    return size;
  };

  window.findByValue = function(id) {
    var data = squares[id];
    return {
      row: data.row,
      col: data.col
    };
  };

  window.findByLocation = function(row, col) {
    return board[row][col];
  };

  window.findEmpty = function() {
    return {
      row: empty.row,
      col: empty.col
    };
  };

  window.checkIfSolved = function() {
    return isSolved();
  };

  window.moveByLocation = function(row, col) {
    if (!error) {
      var result = movePiece(row, col);
      if (!result) {
        error = true;
        $error.text("There has been a grievous mistake.");
      } else {
        renderQueue.push(getBoard());
      }
    }
  };

  window.moveByValue = function(id) {
    var piece = squares[id];
    if (!error) {
      var result = movePiece(piece.row, piece.col);
      if (!result) {
        error = true;
        $error.text("There has been a grievous mistake.");
      } else {
        renderQueue.push(getBoard());
      }
    }
  };

  window.hasThereBeenAnError = function() {
    return error;
  };

  //
  // Functions available for console testing
  //

  window.printBoard = function() {
    for (var i = 0; i < size; i++) {
      var row = [];
      for (var j = 0; j < size; j++) {
        row.push(board[i][j]);
      }
      console.log(row);
    }
  };

  // Window.move will be a tiny bit smart
  window.move = function(idOrRow, col) {
    if (!error){
      var result;
      if (col === undefined) {
        result = movePiece(squares[idOrRow].row, squares[idOrRow].col);
      } else {
        result = movePiece(idOrRow, col);
      }
      console.log(result);
      if (!result) {
        error = true;
        $error.text("There has been a grievous mistake.");
      } else {
        renderQueue.push(getBoard());
      }
    }
  }

  //
  // Event bindings
  //

  $board.on('click', '.square', function(e) {
    if (!running) {
      var square = $(e.target);
      var row = Number(square.attr('row'));
      var col = Number(square.attr('col'));
      movePiece(row, col);
      renderBoard(board);
    }
  });

  $sizeSlider.on('mouseup', function() {
    size = $sizeSlider.val();
    $(document).attr('title', (Math.pow(size, 2) - 1) + " Puzzle");
    reset();
  });

  $speedSlider.on('change', function() {
    moveInterval = 1000 - 20*Number($speedSlider.val());
  });

  $reset.on('click', function() {
    reset();
  });

  $run.on('click', function() {
    running = true;
    solve();
    startRenderLoop();
  });


  //
  // Init
  //

  reset();

});