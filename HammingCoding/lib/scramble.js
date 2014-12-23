var ERROR_RATE = 0.02;

module.exports = function(input) {
  var output = [];
  var changes = [];
  for (var i = 0; i < input.length; i++) {
    if (Math.random() < ERROR_RATE) {
      output[i] = 1 - input[i];
      changes.push(i+1);
    } else {
      output[i] = input[i];
    }
  }
  return {output: output, changes: changes};
};

module.exports.errorRate = ERROR_RATE;