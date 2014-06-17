var insertTest = function(list) {
  it("correctly inserts " + JSON.stringify(list), function() {
    var heap = new Heap();
    var len = list.length;
    for (var i = 0; i < len; i++) {
      heap.insert(list[i]);
    }
    var data = heap.show();
    for (var i = 0; i < len; i++) {
      expect(data[i]).to.exist();
      if (i < len - 1) {
        expect(data[i]).to.be.under(data[i+1]);
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

describe("has the heap property with a list", function() {
  insertTest([1]);
  insertTest([1, 2, 3, 4]);
  insertTest([2, 1]);
  insertTest([5, 3, 4, 2, 1]);
  insertTest([46, 57, 23, 14, 43, 79, 100]);
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