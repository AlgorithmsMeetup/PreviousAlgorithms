var ascii     = require("./lib/ascii");
var hamming   = require("./lib/hammingCoder");
var scramble  = require("./lib/scramble");

function bitsToString(bits) {
  return bits.join("");
}

function lineBreak() {
  console.log(" ");
}

var input = process.argv[2];
lineBreak();
lineBreak();
console.log("-----------------------------");
console.log("Initializing Hamming Coder...");
console.log("-----------------------------");
lineBreak();

console.log("Input message:", input);
lineBreak();

var inputBits = ascii.toBits(input);
console.log("In bits, that's", bitsToString(inputBits));
lineBreak();

var encoded = hamming.encode(inputBits);
console.log("Encoding that into", bitsToString(encoded));
lineBreak();

var scrambled = scramble(encoded);
console.log("Scrambling your message with an error rate of", scramble.errorRate);
lineBreak();

console.log("It's now", bitsToString(scrambled));
lineBreak();

var decoded = hamming.decode(scrambled);
console.log("Decoded that into", bitsToString(decoded));
lineBreak();

var output = ascii.fromBits(decoded);
console.log("Output message:", output);
lineBreak();
lineBreak();
lineBreak();
