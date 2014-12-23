var Matrix = require("functional-matrix");
var solution = require("../solution");

// Encode exactly 4 bits into 7 bits.
function encode4Bits(bits) {
  // return solution.encode4Bits(bits);
  return bits;
}

// Decode exactly 7 bits into 4 bits.
function decode7Bits(bits) {
  // return solution.decode7Bits(bits);
  return bits;
}

// Encode any number of bits.
function encode(bits) {
  // return solution.encode(bits, encode4Bits);
  return bits;
}

// Decode any number of bits.
function decode(bits) {
  // return solution.decode(bits, decode7Bits);
  return bits;
}

module.exports = {
  encode: encode,
  decode: decode
};