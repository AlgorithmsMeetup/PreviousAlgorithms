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

};

Heap.prototype.insert = function(element) {

};

Heap.prototype.extract = function() {

};

