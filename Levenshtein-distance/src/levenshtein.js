function levenshtein(start, end){

  if(start.length === 0){ return end.length; }
  if(end.length === 0){ return start.length; }

  var removeFromStart = levenshtein(start.slice(1), end) + 1;
  var removeFromEnd = levenshtein(start, end.slice(1)) + 1;
  var change = levenshtein(start.slice(1), end.slice(1)) + (start[0] !== end[0] ? 1 : 0);
  // console.log('removeFromStart',removeFromStart,'removeFromEnd', removeFromEnd, 'change',change);
  return Math.min(removeFromStart, removeFromEnd, change);
};
