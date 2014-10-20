var editDistance = function(str1, str2) {
  if (str1 === str2) {
    return 0;
  }

  if (!str1.length || !str2.length) {
    return str1.length || str2.length;
  }

  var len1 = str1.length;
  var len2 = str2.length;

  // Set up the matrix.
  var matrix = [];
  for (var row = 0; row <= len1; row++) {
    var arr = new Array(len2 + 1);
    matrix.push(arr);
  }

  for (var row = 0; row <= len1; row++) {
    matrix[row][0] = row;
  }

  for (var col = 0; col <= len2; col++) {
    matrix[0][col] = col;
  }

  for (var row = 1; row <= len1; row++) {
    for (var col = 1; col <= len2; col++) {

      // If two strings match at their final character, their LCS
      // is the LCS of their prefixes, plus that final character.
      if (str1[row-1] === str2[col-1]) {
        matrix[row][col] = matrix[row-1][col-1];

      // Otherwise, their LCS is the best LCS that results from
      // trimming either of their final characters, plus one.
      } else {
        var del = matrix[row-1][col];
        var ins = matrix[row][col-1];
        var sub = matrix[row-1][col-1];
        matrix[row][col] = Math.min(del, ins, sub) + 1;
      }
    }
  }

  return matrix[len1][len2];
};