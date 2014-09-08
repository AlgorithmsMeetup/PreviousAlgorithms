var generateTest = function(func, input1, input2, expected) {
  it("Testing: '" + input1 + "' and '" + input2 + "'", function() {
    expect(func).to.be.a("function");
    var result = func(input1, input2);
    expect(result).to.equal(expected);
  });
};

var edTest = generateTest.bind(null, editDistance);
var fsTest = generateTest.bind(null, fuzzyStringMatch);

describe("edit distance", function() {

  var tests = [
    ["", "", 0],
    ["", "a", 1],
    ["a", "", 1],
    ["a", "b", 1],
    ["cap", "taps", 2],
    ["sitting", "kitten", 3],
    ["absolutely", "positively", 6]
  ];

  tests.forEach(function(test) {
    edTest.apply(null, test);
  });

});

describe("fuzzy string match", function() {

  var tests = [
    ["abcdefgh", "cdef", 1],
    ["abcdefgh", "cedf", 0.5],
    ["abcdefgh", "wxyz", 0],
    ["hello operator", "hell", 1],
    ["hello operator", "hullo", 0.8],
    ["when in the course of human events", "seven", 0.8],
  ];

  tests.forEach(function(test) {
    fsTest.apply(null, test);
  });

});