(function() {
  var cache, myAnswer, yourAnswer, valueInDollars, recurse, value, _i, _len, generateTest;

  cache = [[]];
  for (_i = 0, _len = coinValues.length; _i < _len; _i++) {
    value = coinValues[_i];
    cache.push([]);
  }

  myAnswer = function(amount) {

    answer = recurse(amount, coinValues);
    return answer;
  };

  recurse = function(amount, coins) {
    var coinsWithoutMax, count, deduction, max;
    if (coins.length === 1) {
      return 1;
    } else if (cache[coins.length][amount]) {
      return cache[coins.length][amount];
    } else if (amount === 0) {
      return 1;
    }

    count = 0;
    deduction = 0;
    max = coins[0];
    coinsWithoutMax = coins.slice(1);
    while (amount >= deduction) {
      count += recurse(amount - deduction, coinsWithoutMax);
      deduction += max;
    }
    cache[coins.length][amount] = count;
    return count;
  };

  valueInDollars = function(value) {
    return (value / 100).toFixed(2);
  };

  generateTest = function(value) {
    var start = Date.now();
    var yourAnswer = makeChange(value);
    var time = Date.now() - start;
    console.log(start, Date.now());
    it("Change for $" + valueInDollars(value) + " - your calcuations took " + time + " miliseconds.", function() {
      expect(yourAnswer).to.equal(myAnswer(value));
    });
  };

  describe("1-50", function() {
    for(var i = 1; i <= 50; i++) {
      generateTest(i);
    }
  });

  describe("51-100", function() {
    for(var i = 51; i <= 100; i += 2) {
      generateTest(i);
    }
  });

  describe("101-1000", function() {
    for(var i = 101; i <= 1000; i += 5) {
      generateTest(i);
    }
  });

  describe("bonus!", function() {
    generateTest(2000);
    generateTest(5000);
    generateTest(10000);
    generateTest(20000);
    generateTest(50000);
  });

})();
