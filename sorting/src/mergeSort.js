var mergeSort = function(array){
  // Start by leaving mergeSort alone and only implementing merge below.
  // Or if you're feeling bold, delete this function body and rewrite it too!
  if (array.length === 1)  { return array; }
  var mid   = Math.floor(array.length/2);
  var left  = mergeSort(array.slice(0, mid)) || [];
  var right = mergeSort(array.slice(mid, array.length)) || [];
  return merge(left, right);
};

function merge(left, right){
  // Implement a helper function to merge elements here:

};
