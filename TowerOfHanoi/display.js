var config = require("./config");

var indent = config.columns <=  3 ? "           " :
             config.columns === 4 ? "         " :
             config.columns === 5 ? "       " :
             config.columns === 6 ? "     " :
             config.columns === 7 ? "   " :
             config.columns === 8 ? " " : "";

var displayElem = function(idx, tower) {
  var elem = tower[idx];
  return typeof elem === "undefined" ? " " : elem;
};

module.exports.init = function(towers) {
  console.log("");
  console.log("     =======================");
  console.log("       The Towers of Hanoi  ");
  console.log("     =======================");
  console.log("");
  console.log("");
  module.exports.towers(towers);
};

module.exports.towers = function(towers) {
  for (var i = config.pieces; i--;) {
    var str = indent + towers.map(displayElem.bind(null, i)).join("   ");
    console.log(str);
  }
  var underline = indent;
  for (i = 0; i < 4*config.columns - 3; i++) {
    underline += "-";
  }

  console.log(underline + "\n");
};

module.exports.error = function(err) {
  console.error("     ERROR:", err + ".");
  console.log("\n\n");
  process.exit(1);
};

module.exports.victory = function() {
  console.log("\n");
  console.log("     VICTORY");
  console.log("\n\n");
  process.exit(1);
};

if (process.argv[2] === "--norender") {
  module.exports.towers = function() {};
}