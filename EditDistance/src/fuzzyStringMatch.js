var fuzzyStringMatch = function(text, query) {

  var qLen = query.length;
  var tLen = text.length;

  var prevPrevRow;
  var prevRow = [];
  // Fill in previous row with empty subsequences.
  for (var col = 0; col <= tLen; col++) {
    prevRow[col] = 0;
  }
  var currRow = [1];

  // Fake iterating through the whole matrix,
  // but remembering only two rows at a time.
  for (var row = 1; row <= qLen; row++) {
    for (var col = 1; col <= tLen; col++) {

      // If two strings match at their final character, their LCS
      // is the LCS of their prefixes, plus that final character.
      if (query[row-1] === text[col-1]) {
        currRow[col] = prevRow[col-1];

      // Otherwise, their LCS is the best LCS that results from
      // trimming either of their final characters.
      } else {
        var del = prevRow[col] + 1;
        var ins = currRow[col-1] + 1;
        var sub = prevRow[col-1] + 1;
        currRow[col] = Math.min(del, ins, sub);
      };
    }
    prevPrevRow = prevRow;
    prevRow = currRow;
    currRow = [row + 1];
  }

  var min = Math.min.apply(null, prevRow);
  console.log(min, qLen);
  return (qLen-min)/qLen;
};
