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

  // Dynamic programming woo!
  for (var row = size - 1; row > 0; row--) {
    for (var col = 0; col < size; col++) {

      // `Choices` are three consecutive squares.
      var currentRow = input[row];
      var choices = currentRow.slice(col - 1, col + 2);

      // Update the square above these choices.
      input[row - 1][col] += Math.min.apply(this, choices);
    }
  }

  // Below is just the greedy algorithm, on our updated array!

  // Find the minimum square to start with, in the first row.
  var path = [];
  for (var i = 1, col = 0; i < size; i++) {
    if (input[0][i] < input[0][col]) {
      col = i;
    }
  }
  path.push(col);
  for (var row = 1; row < size; row++) {

    // Find the totals in the three squares below us.
    var currentRow = input[row];
    var choices = currentRow.slice(col - 1, col + 2);
    var min = Math.min.apply(this, choices);

    // If the choice is to the left or right, change the current column
    if (min == choices[0]) {
      col--;
    } else if (min == choices[2]) {
      col++;
    }

    // Put the current column in our path.
    path.push(col);
  }
  return path;
};