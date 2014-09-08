// Note: The metric used here is Damerau–Levenshtein distance.
// This metric imposes a uniform cost for insertion, deletion,
// substitutions, and transposition, as these compose the most
// common human typing mistakes.
var editDistance = function(str1, str2) {
  if (str1 === str2) {
    return 0;
  }

  if (!str1.length || !str2.length) {
    return str1.length || str2.length;
  }

  if (str2.length > str1.length) {
    var temp = str1;
    str1 = str2;
    str2 = temp;
  }

  var len1 = str1.length;
  var len2 = str2.length;

  var prevPrevRow;
  var prevRow = [];

  // Fill in previous row with empty subsequences.
  for (var col = 0; col <= len2; col++) {
    prevRow[col] = col;
  }
  var currRow = [1];

  // Fake iterating through the whole matrix,
  // but remembering only two rows at a time.
  for (var row = 1; row <= len1; row++) {
    for (var col = 1; col <= len2; col++) {

      // If two strings match at their final character, their LCS
      // is the LCS of their prefixes, plus that final character.
      if (str1[row-1] === str2[col-1]) {
        currRow[col] = prevRow[col-1];

      // Otherwise, their LCS is the best LCS that results from
      // trimming either of their final characters, plus one.
      } else {
        var del = prevRow[col] + 1;
        var ins = currRow[col-1] + 1;
        var sub = prevRow[col-1] + 1;
        currRow[col] = Math.min(del, ins, sub);
      }
    }
    prevPrevRow = prevRow;
    prevRow = currRow;
    currRow = [row + 1];
  }

  return prevRow[len2];
};