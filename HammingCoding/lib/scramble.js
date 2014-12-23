var ERROR_RATE = 0.05;

module.exports = function(input) {
  var output = [];
  for (var i = 0; i < input.length; i++) {
    output[i] = Math.random() < ERROR_RATE ? 1 - input[i] : input[i];
  }
  return output;
};

module.exports.errorRate = ERROR_RATE;