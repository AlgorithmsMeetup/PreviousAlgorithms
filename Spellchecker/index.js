var path = require("path");
var fs = require("fs");
var Set = require("./set");
var corpus = String(fs.readFileSync(path.join(__dirname, "./corpus")));
console.log("\nInitializing spellchecker!\n");

/*
  Returns an object with each unique word in the input as a key,
  and the count of the number of occurances of that word as the value.
  (HINT: the code `text.toLowerCase().match(/[a-z]+/g)` will return an array
  of all lowercase words in the string.)
*/
function getWordCounts(text) {
  // return text.toLowerCase().match(/[a-z]+/g).reduce(function(output, word) {
  //   var key = word.toLowerCase();
  //   output[key] = (output[key] + 1) || 1;
  //   return output;
  // }, {});
}

var WORD_COUNTS = getWordCounts(corpus);
var alphabet = "abcdefghijklmnopqrstuvwxyz";

/*
  Returns the set of all strings 1 edit distance away from the input word.
  This consists of all strings that can be created by:
    - Adding any one character (from the alphabet) anywhere in the word.
    - Removing any one character from the word.
    - Transposing (switching) the order of any two adjacent characters in a word.
    - Substituting any character in the word with another character.
*/
function editDistance1(word) {

}


/* Given a word, attempts to correct the spelling of that word.
  - First, if the word is a known word, return the word.
  - Second, if the word has any known words edit-distance 1 away, return the one with
    the highest frequency, as recorded in NWORDS.
  - Third, if the word has any known words edit-distance 2 away, return the one with
    the highest frequency, as recorded in NWORDS. (HINT: what does applying
    "editDistance1" *again* to each word of its own output do?)
  - Finally, if no good replacements are found, return the word.
*/
function correct(word) {
  
}

/*
  This script runs your spellchecker on every input you provide.
*/
var inputWords = process.argv.slice(2);
var output = inputWords.map(function(word) {
  var correction = correct(word);
  if (correction === word) {
    return " - " + word + " is spelled correctly.";
  } else if (typeof correction === "undefined") {
    return " - " + word + " didn't get any output from the spellchecker.";
  } else {
    return " - " + word + " should be spelled as " + correction + ".";
  }
});
console.log(output.join("\n\n"));
console.log("\nFinished!");





