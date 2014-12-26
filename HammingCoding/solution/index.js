var Matrix = require("functional-matrix");

// Encode exactly 4 bits into 7 bits.
function encode4Bits(bits) {
  var G = new Matrix([
    [0, 1, 1, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0, 1, 0],
    [1, 1, 1, 0, 0, 0, 1]
  ]);
  return Matrix.vector(bits).times(G).mod(2).popRow();
}

// Decode exactly 7 bits into 4 bits.
function decode7Bits(bits) {
  var H = new Matrix([
    [1, 0, 0, 0, 1, 1, 1],
    [0, 1, 0, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 0, 1]
  ]);

  var asMatrix = new Matrix.vectorVertical(bits);
  var syndrome = H.times(asMatrix).mod(2);
  H.eachCol(function(col, idx) {
    if (syndrome.equalsCol(0, col)) {
      bits[idx] = 1 - bits[idx];
    }
  });

  return bits.slice(3);
}

// Encode any number of bits.
function encode(bits, encoder) {
  encoder = encoder || encode4Bits;
  var output = [];
  for (var i = 0; i < bits.length; i += 4) {
    var chunk = bits.slice(i, i+4);
    while (chunk.length < 4) {
      chunk.push(0);
    }
    var encoded = encoder(chunk);
    output = output.concat(encoded);
  }
  return output;
}

function decode(bits, decoder) {
  decoder = decoder || decode7Bits;
  var output = [];
  for (var i = 0; i < bits.length; i += 7) {
    var chunk = bits.slice(i, i+7);
    var decoded = decoder(chunk);
    output = output.concat(decoded);
  }
  return output;
}

module.exports = {
  encode4Bits: encode4Bits,
  decode7Bits: decode7Bits,
  encode: encode,
  decode: decode
};