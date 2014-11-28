var actions = require("./actions");
var config = require("./config");

var recursivelyMove = function(n, from, via, to) {
  if (n === 1) {
    actions.move(from, to);
  } else {
    recursivelyMove(n - 1, from, to, via);
    actions.move(from, to);
    recursivelyMove(n - 1, via, from, to);
  }
};

recursivelyMove(config.pieces, 0, 1, 3);
actions.finish();