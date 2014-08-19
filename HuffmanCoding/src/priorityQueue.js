var PriorityQueue = function() {
    this._data = [];
};

PriorityQueue.prototype._leftChildOf = function(index) {
    return 2*index + 1;
};
PriorityQueue.prototype._rightChildOf = function(index) {
    return 2*index + 2;
};
PriorityQueue.prototype._parentOf = function(index) {
    return index ? Math.floor((index - 1)/2) : undefined;
};
PriorityQueue.prototype._hasElementAt = function(index) {
    return typeof this._data[index] !== "undefined";
};
PriorityQueue.prototype._swap = function(index1, index2) {
    var temp = this._data[index1];
    this._data[index1] = this._data[index2];
    this._data[index2] = temp;
};

PriorityQueue.prototype._val = function(index) {
  return this._data[index].val;
};

PriorityQueue.prototype._key = function(index) {
  return this._data[index].key;
};

PriorityQueue.prototype.show = function(noLog) {
    if (!noLog) {
        console.log(this._data);
    }
    return this._data;
};

PriorityQueue.prototype.size = function() {
  return this._data.length;
};

PriorityQueue.prototype.peek = function() {
    return this._data[0];
};

PriorityQueue.prototype.insert = function(key, val) {
    var element = {key: key, val: val};
    var current = this._data.push(element) - 1;
    var parent = this._parentOf(current);
    var working = parent !== undefined;

    while (working && current > 0) {
        console.log(this._key(parent), this._key(current));
        if (this._key(parent) > this._key(current)) {
            this._swap(current, parent);
            current = parent;
            parent = this._parentOf(current);
        } else {
            working = false;
        }
    }

};

PriorityQueue.prototype.extract = function() {
    if (this._data.length === 1) {
      return this._data.pop();
    }

    var toReturn = this._data[0];
    this._data[0] = this._data.pop();
    var current = 0;
    var left = 1;
    var right = 2;
    var working = true;

    while (working) {
        if (this._hasElementAt(left) || this._hasElementAt(right)) {
            // Find which of the two children is smaller.
            var minChild;
            if (!this._hasElementAt(left)) {
                minChild = right;
            } else if (!this._hasElementAt(right)) {
                minChild = left;
            } else if (this._key(right) < this._key(left)) {
                minChild = right;
            } else {
                minChild = left;
            }

            if (this._key(current) > this._key(minChild)) {
                this._swap(current, minChild);
                current = minChild;
                left = this._leftChildOf(current);
                right = this._rightChildOf(current);
            } else {
                working = false;
            }
        } else {
            working = false;
        }
    }

    return toReturn;
};