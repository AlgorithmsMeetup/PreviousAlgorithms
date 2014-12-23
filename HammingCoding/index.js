var ascii     = require("./lib/ascii");
var hamming   = require("./lib/hammingCoder");
var scramble  = require("./lib/scramble");

function bitsToString(bits) {
  return bits.join("");
}

function listToString(list) {
  if (list.length === 0) {
    return "-- none --";
  } else if (list.length === 1) {
    return list[0];
  } else if (list.length === 2) {
    return [list[0], "and", list[1]].join(" ");
  } else {
    return [list.slice(0, -1).join(", ") + ", and", list[list.length - 1]].join(" ");
  }
}

function lineBreak() {
  console.log(" ");
}

function log() {
  console.log.apply(console, arguments);
  lineBreak();
}


var input = process.argv[2];
lineBreak();
lineBreak();
log("Initializing Hamming Coder...");

log(" - Input message:        ", input);

var inputBits = ascii.toBits(input);
log(" - In bits, that's:      ", bitsToString(inputBits));

var encoded = hamming.encode(inputBits);
log(" - Encoding as:          ", bitsToString(encoded));

var scrambled = scramble(encoded);
log(" - Error rate:           ", (scramble.errorRate * 100).toFixed(1) + "%");

log(" - Flipped bits:         ", listToString(scrambled.changes));

log(" - It's now:             ", bitsToString(scrambled.output));

var decoded = hamming.decode(scrambled.output);
log(" - Decoded as:           ", bitsToString(decoded));

var output = ascii.fromBits(decoded);
log(" - Output message:       ", output);
lineBreak();
lineBreak();
lineBreak();
