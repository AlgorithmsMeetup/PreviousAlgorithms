var bubbleSort = function(array){
  // Implement BubbleSort here:
  var array = array.slice();
  for (var i = 0; i < array.length; i++){
    for (var j = array.length; j > 0; j--) {
      if (array[j] < array[j-1]) {
        var tmp = array[j];
        array[j] = array[j-1];
        array[j-1] = tmp;
      }
    }
  }
  return array;
};

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
  var result = [];
  var i   = 0;
  var j   = 0;

  // Compare smallest elements of both lists.
  // Add smallest element to merged list until one list is empty
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Append whatever is left over to the end of resultant list.
  // We can assume this new list will be in sorted order.
  return result.concat(left.slice(i)).concat(right.slice(j));
};
