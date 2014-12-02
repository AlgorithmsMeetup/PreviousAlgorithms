var actions = require("./actions");
var config = require("./config");

var move = actions.move.bind(actions);

var moveNPieces = function(n, from, to, via) {
  if (n === 1) {
    move(from, to);
  } else {
    moveNPieces(n - 1, from, via, to);
    move(from, to);
    moveNPieces(n - 1, via, to, from);
  }
};

moveNPieces(config.pieces, 0, 2, 1);
actions.finish();
