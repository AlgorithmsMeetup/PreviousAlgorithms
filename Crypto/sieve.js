var sieve = function(n) {
  var isPrime = [false, false, true, true, false, true, false, true, false, false,
                 false, true, false, true, false, false, false, true, false, true];
  for (var i = 20; i < n; i++) {
    if ((i % 2) && (i % 3) && (i % 5) && (i % 7) && (i % 11) && (i % 13) && (i % 17) && (i % 19)) {
      isPrime.push(true);
    } else {
      isPrime.push(false);
    }
  }
  for (var i = 23, root = Math.ceil(Math.sqrt(n)); i < root; i += 2) {
    if (!isPrime[i]) continue;
    for (var m = 3*i, step = 2*i; m < n; m += step) {
      isPrime[m] = false;
    }
  }
  primes = isPrime.map(function(b, i) {return b ? i : 0}).filter(function(k) {return k});
  return primes;
};