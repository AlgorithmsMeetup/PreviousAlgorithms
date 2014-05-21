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

var  cache = [[]];
  for (_i = 0, _len = coinValues.length; _i < _len; _i++) {
    value = coinValues[_i];
    cache.push([]);
  }

var makeChange = function(amount) {
  return makeSomeChange(amount).length;
};

//returns array of array-of-possible-combinations
var makeSomeChange = function(amount, coins) {
    coins = coins || coinValues;
    if (cache[coins.length][amount]) {
      result = cache[coins.length][amount];
    }
    var output = [];
    for(var i = 0; i<coins.length; i++){
      var coinValue = coins[i];
      if(coinValue === amount){
        output.push([coinValue]);        
      } else if (coinValue < amount){
        var remainder = amount - coinValue;
        var smallerCoins = coins.slice(i);
        var smallerCoinChange = makeSomeChange(remainder, smallerCoins);
        if (smallerCoinChange.length > 0){
          for(var j = 0; j< smallerCoinChange.length; j++){
            output.push([coinValue].concat(smallerCoinChange[j]));
          }
        }
      }
    }
    cache[coins.length][amount] = output;
    return output;
};

