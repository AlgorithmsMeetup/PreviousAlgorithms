/*
 * HackReactor Algorithms Meetup
 * sorting algorithms
 */

var solution   = require('./solution');
var algorithms = require('./lib/sortingAlgs');

// logging helper
// source: peterkhayes (GitHub handle)
function log() {
  console.log.apply(console, arguments);
  console.log(' ');
}

log('Generating sortable data. (this might take a few seconds)');
// dataset:
// I.  small data set to visualize the correctness of the algorithms
// II. large data set to demonstrate differences in running time
var dataSet = {
  small : solution.generateRandomIntList(10 , 100), /* I  */
  large : solution.generateRandomIntList(1e4, 1000) /* II */
};

log('Testing sorting algorithms with small data set:');

log('Bubblesort:')
// log(solution.mapSort(dataSet.small, algorithms.bubbleSort).result);
log(solution.mapSort(dataSet.small, solution.bubbleSort).result);

log('Mergesort');
log(solution.mapSort(dataSet.small, solution.doMergeSort).result);

log('(these should be the same^)');

log('Testing sorting algorithms with large data set:');

log('Mergesort');
log('Sorting Time: ',
  solution.mapSort(dataSet.large, solution.doMergeSort).timeElapsed, 'ms');

log('Bubblesort:')
log('Sorting Time: ',
  solution.mapSort(dataSet.large, solution.bubbleSort).timeElapsed, 'ms');

log('Mergesort should take less time than Bubblesort.');
