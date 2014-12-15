var path = require("path");
var fs = require("fs");
var Set = require("./set");
var corpus = fs.readFileSync(path.join(__dirname, "./corpus"));
console.log("\nInitializing spellchecker!\n");

/*
  Returns an object with each unique word input as a key, and the count
  of the number of occurances of that word as the value.
*/
function getWordCounts(text) {

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
function edits1(word) {

}

/*
  Given a list of potential words, returns only those words that occured in the corpus.
  (HINT: Words in the corpus are the keys of WORD_COUNTS.)
*/
function known(words) {

}


/* Given a word, attempts to correct the spelling of that word.
  - First, if the word is a known word, return the word.
  - Second, if the word has any known words edit-distance 1 away, return the one with
    the highest frequency, as recorded in NWORDS.
  - Third, if the word has any known words edit-distance 2 away, return the one with
    the highest frequency, as recorded in NWORDS. (HINT: what does applying "edits1" 
    *again* to each word of its own output do?)
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





