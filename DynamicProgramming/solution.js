/*
  Greetings, algorithmics!

  Your task today is to find the minimum path through a grid of numbers, top to bottom,
  where at each row, you are permitted to move straight down, down and left, or down and right.

  This is a famous problem for introducing Dynamic Programming, a technique for solving recursive
  problems more optimally.  When we do DP, we try not to solve the same sub-problem twice, and
  we build solutions from the bottom-up instead of the top-down.

  INPUT:  A two-dimensional grid of size NxN, where N is the `size` variable listed below.
  OUTPUT: A single array, listing the columns that you pass through.  For example, [1, 2, 3..]
          means that in row 0, you are in column 1; in row 1, you are in column 2, etc
          The output should be of length equal to the `size` variable.

  If you finish this problem early, and want a challenge, try to find a Dynamic Programming
  solution to last meetup's making-change problem!  This is a little more challenging...
*/

var size = 15;

var findMinimumPath = function(input) {

  // This is the "greedy" solution - it's not very good...
  // You should scrap it and start over with a dynamic programming solution!
  // But it might be of some help to you!

  var solution = [];
  var currentCol = 0;
  for (var i = 1; i < size; i++) {
    if (input[0][i] < input[0][currentCol]) {
      currentCol = i;
    }
  }
  solution.push(currentCol);
  for (var y = 1; y < size; y++) {
    var currentRow = input[y];
    var left = currentRow[currentCol - 1] || Infinity;
    var below = currentRow[currentCol];
    var right = currentRow[currentCol + 1] || Infinity;
    var min = Math.min(left, below, right);
    if (min == left) {
      currentCol--;
    } else if (min == right) {
      currentCol++;
    }
    solution.push(currentCol);
  }
  return solution;
};