(function() {
  var cache, myCoinValues, maxAmount, generateAnswers, yourAnswer, valueInDollars, count, value, _i, _len, generateTest, answers;

  cache = [[]];
  for (_i = 0, _len = coinValues.length; _i < _len; _i++) {
    value = coinValues[_i];
    cache.push([]);
  }

  count = function(amount, coins) {
    var result = 0;
    if (cache[coins.length][amount]) {
      result = cache[coins.length][amount];
    } else if (amount === 0) {
      result = 1;
    } else if (amount < 0) {
      result = 0;
    } else if (coins.length === 0) {
      result = 0;
    } else {
      result = count(amount, coins.slice(1)) + count(amount - coins[0], coins)
    }
    cache[coins.length][amount] = result;
    return result
  };

  answers = [];
  myCoinValues = coinValues.sort(function(a, b) {return b - a;});
  maxAmount = amountsToTest[amountsToTest.length - 1];
  for (var i = 0; i <= maxAmount; i++) {
    answers[i] = count(i, myCoinValues)
  }

  amountInDollars = function(amount) {
    return (amount / 100).toFixed(2);
  };

  generateTest = function(amount) {
    it("Change for $" + amountInDollars(amount), function() {
      console.log("!!!!test for", amount);
      expect(makeChange(amount)).to.equal(answers[amount]);
    });
  };

  for (var i = 0; i < amountsToTest.length; i++) {
    generateTest(amountsToTest[i]);
  };

})();
