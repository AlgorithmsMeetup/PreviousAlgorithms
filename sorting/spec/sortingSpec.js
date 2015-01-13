mocha.setup({ignoreLeaks: true});

describe('BubbleSort', function() {
  array1 = [0,-1,1,5,-5,2,3,7];
  copyOfArray1 = [0,-1,1,5,-5,2,3,7];
  sortedArray1 = [-5,-1,0,1,2,3,5,7];

  it('should sort an array of integers', function() {
    bubbleSort(array1).forEach(function(element, index){
      expect(element).to.be(sortedArray1[index]);
    });
  });
  it('should not mutate the original array', function() {
    bubbleSort(array1);
    array1.forEach(function(element, index){
      expect(element).to.be(copyOfArray1[index]);
    });
  });
});

describe('MergeSort', function() {
  array1 = [0,-1,1,5,-5,2,3,7];
  copyOfArray1 = [0,-1,1,5,-5,2,3,7];
  sortedArray1 = [-5,-1,0,1,2,3,5,7];

  it('should sort an array of integers', function() {
    mergeSort(array1).forEach(function(element, index){
      expect(element).to.be(sortedArray1[index]);
    });
  });
  it('should not mutate the original array', function() {
    mergeSort(array1);
    array1.forEach(function(element, index){
      expect(element).to.be(copyOfArray1[index]);
    });
  });
  it('should sort a large array faster than bubbleSort', function(){
    var array = [];
    for(var i=0; i<1e3; i++) {
      array.push(Math.floor(Math.random() * 100));
    }
    bubbleSortResults = timer(bubbleSort, array);
    mergeSortResults = timer(mergeSort, array);
    mergeSortResults.result.forEach(function(element, index){
      expect(element).to.be(bubbleSortResults.result[index]);
    });
    expect(mergeSortResults.timeElapsed).to.be.below(bubbleSortResults.timeElapsed);
  });
});

xdescribe('Extra Credit', function() {
  it('sort non-integer arrays');
  it('write tests to compare sorting speeds for large arrays');
  it('write tests for sorting stability');
  it('implement selectionSort');
  it('implement insertionSort');
  it('implement quickSort');
});

function timer(sortingAlgorithm, array){
  // copy array;
  var tempArray = array.slice();
  // time the algorithm
  var start = new Date().getTime();
  var result = sortingAlgorithm(tempArray);
  var end = new Date().getTime();
  return {
    timeElapsed : end - start,
    result      : result
  };
};
