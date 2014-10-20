var fuzzyStringMatch = function(text, query) {
  if (query === text) {
    return 0;
  }

  if (!query.length || !text.length) {
    return query.length || text.length;
  }

  var queryLen = query.length;
  var textLen = text.length;

  // Set up the matrix.
  var matrix = [];
  for (var row = 0; row <= queryLen; row++) {
    var newRow = new Array(textLen + 1);
    newRow[0] = row;
    if (row === 0) {
      for (var col = 1; col <= textLen; col++) {
        newRow[col] = 0;
      }
    }
    matrix.push(newRow);
  }

  // Fake iterating through the whole matrix,
  // but remembering only two rows at a time.
  for (var row = 1; row <= queryLen; row++) {
    for (var col = 1; col <= textLen; col++) {

      // If two strings match at their final character, their LCS
      // is the LCS of their prefixes, plus that final character.
      if (query[row-1] === text[col-1]) {
        matrix[row][col] = matrix[row-1][col-1];


      // Otherwise, their LCS is the best LCS that results from
      // trimming either of their final characters, plus one.
      } else {
        var del = matrix[row-1][col] + 1;
        var ins = matrix[row][col-1] + 1;
        var sub = matrix[row-1][col-1] + 1;
        matrix[row][col] = Math.min(del, ins, sub);
      }
    }
  }
  var minDistance = Math.min.apply(null, matrix[queryLen]);
  return 1 - minDistance/queryLen;
};
