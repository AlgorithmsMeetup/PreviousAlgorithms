var mergeSort = function(array){
  // Implement mergeSort here
  if (array.length === 1)  { return array; }

  // More than one element? Divide list into left/right parts
  var mid   = Math.floor(array.length/2);
  var left  = mergeSort(array.slice(0, mid)) || [];
  var right = mergeSort(array.slice(mid, array.length)) || [];

  return merge(left, right);
};

function merge(left, right){
  // Implement a helper function to merge elements here:

};
