var Matrix = require("functional-matrix");

// Encode exactly 4 bits into 7 bits.
function encode4Bits(bits) {
  var G = new Matrix([
    [0, 1, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0, 1, 0],
    [1, 1, 1, 0, 0, 0, 1]
  ]);
  return new Matrix([bits]).times(G).mod(2).popRow();
}

// Decode exactly 7 bits into 4 bits.
function decode7Bits(bits) {
  var H = new Matrix([
    [1, 0, 0, 0, 1, 1, 1],
    [0, 1, 0, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 0, 1]
  ]);

  var asMatrix = new Matrix([bits]).transpose();
  var syndrome = H.times(asMatrix).mod(2).popCol();
  H.eachCol(function(col, idx) {
    if (col[0] == syndrome[0] && col[1] == syndrome[1] && col[2] == syndrome[2]) {
      bits[idx] = 1 - bits[idx];
    }
  });

  return bits.slice(3);
}

// Encode any number of bits.
function encode(bits) {
  var output = [];
  for (var i = 0; i < bits.length; i += 4) {
    var chunk = bits.slice(i, i+4);
    while (chunk.length < 4) {
      chunk.push(0);
    }
    var encoded = encode4Bits(chunk);
    output = output.concat(encoded);
  }
  return output;
}

function decode(bits) {
  var output = [];
  for (var i = 0; i < bits.length; i += 7) {
    var chunk = bits.slice(i, i+7);
    var decoded = decode7Bits(chunk);
    output = output.concat(decoded);
  }
  return output;
}

module.exports = {
  encode: encode,
  decode: decode
};