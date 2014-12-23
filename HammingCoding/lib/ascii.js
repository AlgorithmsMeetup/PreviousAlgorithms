function fromBits(bits) {
  var output = "";
  for (var i = 0; i < bits.length; i += 7) {
    var charBits = bits.slice(i, i+7);
    var code = parseInt(charBits.join(""), 2);
    output += String.fromCharCode(code);
  }
  return output;
}

function toBits(str) {
  return str.toString().split("")
    .map(function(c) {
      return ("0000000" + c.charCodeAt(0).toString(2)).slice(-7).split("").map(Number);
    })
    .reduce(function(acc, charBits) {
      return acc.concat(charBits);
    }, []);
}

module.exports = {
  toBits: toBits,
  fromBits: fromBits
};