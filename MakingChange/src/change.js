/*
  Greetings, algorithmics!

  Today, your challenge is to figure out the number of ways to make change for a given amount of money.
  More precisely, given a number of cents and a set of coins, determine how many combinations of those coins
  sum to that number of cents.
  This is a classic algorithms problem that's common in interviews!

  Your only helper is a list of common US currency denominations.
  I didn't include half-dollars, two-dollar bills, and the like, but if you'd prefer, you can adjust
  the list of coin-values and the tests will auto-update.

  Enjoy!
*/

var coinValues = [10000, 5000, 2000, 1000, 500, 100, 50, 25, 10, 5, 1];

// A recursive solution, as discussed at the meetup.
var makeChange = function(amount) {

  var cache = [];
  for (var i = 0; i <= coinValues.length; i++) {
    cache.push([]);
  }

  var recurse = function(amount, coins) {
    if (amount === 0) {
      return 1;
    } else if (coins.length === 1) {
      return 1;
    } else {
      if (cache[coins.length][amount] !== undefined) {
        return cache[coins.length][amount];
      }

      var total = 0;
      var newCoins = coins.slice(1);
      total += recurse(amount, newCoins);
      if (coins[0] <= amount) {
        total += recurse(amount - coins[0], coins);
      }
      cache[coins.length][amount] = total;
      return total;
    }
  };

  for (var i = 0; i < amount; i++) {
    recurse(i, coinValues);
  }

  return recurse(amount, coinValues);
};

// Bonus: A dynamic programming solution!  About 2x as fast - see if you can figure it out!
// Hint: write the problem as a table.  Each row represents the amount of change to make,
// and each column represents a kind of coin (the leftmost is 0, second is 1c, third is 5c, etc)
//
// To calculate the value of each square, we add the values of two other squares together -
//    * The square to the left, which represents getting rid of the biggest coin.
//    * The square as many rows above as the value of the biggest coin.
//    * This avoids having to ever call things recursively - we just build a big table!
//
// var makeChange = function(amount) {
//   var coins = coinValues.concat(0).reverse();

//   var cache = [[]];
//   for (var i = 0; i < coins.length; i++) {
//     cache[0].push(1);
//   }

//   for (var row = 1; row <= amount; row++) {
//     for (var col = 0; col <= coins.length; col++) {
//       var left = col > 0 ? cache[row][col-1] : 0;
//       var above = (cache[row - coins[col]] ? cache[row - coins[col]][col] : 0);
//       cache[row] = cache[row] || [];
//       cache[row][col] = left + above;
//     }
//   }
//   return cache[amount][coins.length];
// };





