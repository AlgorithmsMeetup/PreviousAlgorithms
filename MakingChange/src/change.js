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

var coinValues = [10000, 5000, 2000, 1000, 500, 100, 25, 10, 5, 1];

var makeChange = function(amount) {
  
  var recursion = function(amount, coinsICanUse) {
    if (amount === 0) {
      return 1;
    }
    var result = 0;

    var largestCoin = coinsICanUse[0];
    var minusOneOfLargestCoin = amount - largestCoin;
    if (minusOneOfLargestCoin >= 0) {
      result += recursion(minusOneOfLargestCoin, coinsICanUse);
    }
    
    if (coinsICanUse.length > 1) {
      result += recursion(amount, coinsICanUse.slice(1));
    }

    return result;
  };
  
  return recursion(amount, coinValues.slice());
};


