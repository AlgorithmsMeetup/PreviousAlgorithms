// Recursive solution - not nearly as good as DP.

var recurse = function(row, col) {
  if (row === size - 1) {
    return {
      cost: input[row][col],
      path: [col]
    };
  }
  var left, center, right;
  if (col > 0) {
    left = recurse(row+1, col-1);
  } else {
    left = {cost: Infinity};
  }
  center = recurse(row+1, col);
  if (col < size - 1) {
    right = recurse(row+1, col+1);
  } else {
    right = {cost: Infinity};
  }

  var min = Math.min(left.cost, center.cost, right.cost);
  var choice = null;
  if (min === left.cost) {
    choice = left;
  } else if (min === right.cost) {
    choice = right;
  } else {
    choice = center;
  }

  return {
    cost: choice.cost + input[row][col],
    path: [col].concat(choice.path)
  };
};

var bestPath = null;
var minCost = Infinity;
for (var col = 0; col < size; col++) {
  var bestFromHere = recurse(0, col);
  if (bestFromHere.cost < minCost) {
    minCost = bestFromHere.cost;
    bestPath = bestFromHere.path;
  }
}

return bestPath;