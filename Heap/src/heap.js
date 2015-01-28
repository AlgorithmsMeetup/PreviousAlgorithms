var Heap = function(comparator) {
  this._data = [];
};

// Helper methods.
Heap.prototype._leftChildOf = function(index) {
  return 2*index + 1;
};
Heap.prototype._rightChildOf = function(index) {
  return 2*index + 2;
};
Heap.prototype._parentOf = function(index) {
  return index ? Math.floor((index - 1)/2) : undefined;
};
Heap.prototype._hasElementAt = function(index) {
  return typeof this._data[index] !== "undefined";
};
Heap.prototype._swap = function(index1, index2) {
  var temp = this._data[index1];
  this._data[index1] = this._data[index2];
  this._data[index2] = temp;
};
Heap.prototype.show = function(noLog) {
  if (!noLog) {
    console.log(this._data);
  }
  return this._data;
};

// For you to complete:
Heap.prototype.peek = function() {
  // just return the first value!
  return this._data[0];
};

Heap.prototype.insert = function(element) {
  // add the element to the end of the heap
  this._data.push(element);
  // track the last value added and its parent
  var current = this._data.length - 1;
  var parent = this._parentOf(current);

  // while the last value added is less than its parent
  while(this._data[current] < this._data[parent]){
    // swap that value with its parent
    this._swap(current, parent);
    // and update the current and parent variables to track the new position
    current = parent;
    parent = this._parentOf(current);
  }

  // could return anything, but it's common to return the value being added
  return this;
};

Heap.prototype.extract = function() {
  // if the heap only has one element
  if(this._data.length === 1){
    // remove and return that value
    return this._data.pop();
  }

  // otherwise, store the minimum (first) value to be returned later
  var result = this._data[0];
  // remove the last value, and replace the first value with it
  this._data[0] = this._data.pop();
  // keep track of the current node that was just swapped, as well as its children
  var current = 0;
  var left = 1;
  var right = 2;
  // to help with the upcoming while loop, set a flag to determine when to stop looping
  var continueSwapping = true;

  // while the flag is true
  while(continueSwapping){
    // find the minimum child of the current node:
    // if the current node has at least one child
    // (since we fill the tree from left to right, if there's no left child, there are no children,
    //  so we just have to look for the left child to determine if there are children, rather than both)
    if( this._hasElementAt(left) ){
      var minChild;
      // if there's no right child, then minChild must be the left child
      if(!this._hasElementAt(right)){
        minChild = left;
      // if there is a right child, then compare the two children to determine the minChild
      } else if(this._data[left] < this._data[right]){
        minChild = left;
      } else {
        minChild = right
      }

      // if the current value is greater than the minChild
      if(this._data[current] > this._data[minChild]){
        // swap the current and minChildValues
        this._swap(current, minChild);
        // set current, left, and right to their new values
        current = minChild;
        left = this._leftChildOf(current);
        right = this._rightChildOf(current);
      } else {
        // if the current value is not greater than the minChild,
        // set the flag to false in order to stop swapping and exit the while loop
        continueSwapping = false;
      }
    } else {
      // if the current node has no children, flip the flag to false
      continueSwapping = false;
    }
  }

  // finally, return the minimum value stored from before
  return result;
};
