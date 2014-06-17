var insertTest = function(list) {
  it("can insert (possibly not correctly) " + JSON.stringify(list), function() {
    var heap = new Heap();
    var len = list.length;
    for (var i = 0; i < len; i++) {
      heap.insert(list[i]);
    }
    var data = heap.show(true);
    expect(data.length).to.be(len);
  });
};

var extractTest = function(list) {
  it("can extract (possibly not correctly) " + JSON.stringify(list), function() {
    var heap = new Heap();
    var len = list.length;
    for (var i = 0; i < len; i++) {
      heap.insert(list[i]);
    }
    for (var j = 0; j < len; j++) {
      var element = heap.extract();
      expect(element).to.not.be(undefined);
      expect(element).to.not.be(null);
    }
    var extra = heap.extract();
    var noMore = (typeof extra === "undefined" || extra === null);
    expect(noMore).to.be(true);
  });
};

var heapPropertyTest = function(list) {
  it("correctly heaps " + JSON.stringify(list), function() {
    var heap = new Heap();
    var len = list.length;
    for (var i = 0; i < len; i++) {
      heap.insert(list[i]);
    }
    var data = heap.show(true);
    expect(data.length).to.be(len);
    for (var i = 0; i < len/2; i++) {
      var left = heap._leftChildOf(i);
      var right = heap._rightChildOf(i);
      if (heap._hasElementAt(left)) {
        expect(data[left] - data[i]).to.be.above(-1);
      }
      if (heap._hasElementAt(right)) {
        expect(data[right] - data[i]).to.be.above(-1);
      }
    }
  });
};

var sortingTest = function(list) {
  it("sorts " + JSON.stringify(list), function() {
    var heap = new Heap();
    var len = list.length;
    for (var i = 0; i < len; i++) {
      heap.insert(list[i]);
    }
    var heapSorted = [];
    for (var j = 0; j < len; j++) {
      heapSorted.push(heap.extract());
    }
    expect(JSON.stringify(heapSorted)).to.equal(JSON.stringify(list.sort(function(a, b) {return a - b;})));
  });
};

describe("inserts elements", function() {
  insertTest([1]);
  insertTest([1, 2, 3, 4]);
  insertTest([2, 1]);
  insertTest([5, 3, 4, 2, 1]);
  insertTest([46, 57, 23, 14, 43, 79, 100]);
});

describe("extracts elements", function() {
  extractTest([1, 2, 3]);
  extractTest([3, 2, 1]);
  extractTest([1, 3, 2, 5, 4]);
  extractTest([4, 2, 3, 1, 5]);
  extractTest([9, 5, 7, 6, 4, 2, 5, 3, 1, 8]);
  extractTest([1, 1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1]);
  extractTest([65, 87, 23, 45, 11, 2, 34, 92, 34, 67]);
});

describe("has the heap property with a list", function() {
  heapPropertyTest([1]);
  heapPropertyTest([1, 2, 3, 4]);
  heapPropertyTest([2, 1]);
  heapPropertyTest([5, 3, 4, 2, 1]);
  heapPropertyTest([46, 57, 23, 14, 43, 79, 100]);
});

describe("can sort a list with heap sort", function() {
  sortingTest([1, 2, 3]);
  sortingTest([3, 2, 1]);
  sortingTest([1, 3, 2, 5, 4]);
  sortingTest([4, 2, 3, 1, 5]);
  sortingTest([9, 5, 7, 6, 4, 2, 5, 3, 1, 8]);
  sortingTest([1, 1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 1]);
  sortingTest([65, 87, 23, 45, 11, 2, 34, 92, 34, 67]);
});