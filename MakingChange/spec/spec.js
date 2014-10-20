(function() {

  var cache = [[]];
  var answers = [];
  
  var coins = coinValues.sort(function(a, b) {return b - a;});
  var coinsLength = coins.length;
  var maxAmount = amountsToTest[amountsToTest.length - 1];

  // Fill in all values using dynamic programming.
  for (var i = 0; i < coinsLength; i++) {
    cache[0].push(1);
  }

  for (var row = 1; row <= maxAmount; row++) {
    cache[row] = [];
    for (var col = 0; col < coinsLength; col++) {
      var left = col > 0 ? cache[row][col-1] : 0;
      var above = row - coins[col] >= 0 ? cache[row - coins[col]][col] : 0;
      cache[row][col] = left + above;
    }
  }

  var amountInDollars = function(amount) {
    return (amount / 100).toFixed(2);
  };

  var generateTest = window.generateTest = function(amount) {
    it("Change for $" + amountInDollars(amount), function() {
      var answer = cache[amount][coinsLength - 1];
      expect(makeChange(amount)).to.equal(answer);
    });
  };

  for (var i = 0; i < amountsToTest.length; i++) {
    generateTest(amountsToTest[i]);
  }

})();
