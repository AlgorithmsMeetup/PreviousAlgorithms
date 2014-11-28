var config = require("./config");
var display = require("./display");

var top = function(stack) {
  return stack[stack.length - 1];
};

var checkMove = function(from, to) {
  if (towers[from].length === 0) {
    return display.error(["Cannot move from tower", from, "to tower", to, "because tower", from, "is empty"].join(" "));
  }
  if (top(towers[from]) > top(towers[to])) {
    return display.error(["Cannot move from tower", from, "to tower", to, "because piece", top(towers[from]), "is larger than piece", top(towers[to])].join(" "));
  }
};

var towers = [];
var i;

for (i = 0; i < config.columns; i++) {
  towers.push([]);
}

for (i = config.pieces; i--;) {
  var col = config.random ? Math.floor(Math.random()*config.columns) : 0;
  towers[col].push(i + 1);
}
display.init(towers);

var actions = {};

actions.getBoard = function() {
  return towers.map(function(t) {
    return t.slice();
  });
};

actions.move = function(from, to) {
  checkMove(from, to);
  towers[to].push(towers[from].pop());
  display.towers(towers);
};

actions.finish = function() {
  if (top(towers).length !== config.pieces) {
    return display.error("You haven't finished yet - not all pieces are in the final stack.");
  }
  display.victory();
};

module.exports = actions;




