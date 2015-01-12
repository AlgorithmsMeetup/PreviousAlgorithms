/*
 * HackReactor Algorithms Meetup
 * solutions: implementations from CLR text ISBN 9780262033848
 */

function exchangeElements (ls, a, b) {
  var tmp = ls[a];
  ls[a]   = ls[b];
  ls[b]   = tmp;
}

// semantic helper function for mergesort
function merge (l, r) {
  var res = [];
  var i   = 0;
  var j   = 0;

  // compare smallest elements of both lists -- add smallest element
  // to merged list until one list is empty
  while (i < l.length && j < r.length) {
    if (l[i] < r[j]) {
      res.push(l[i++]);
    } else {
      res.push(r[j++]);
    }
  }

  // append whatever is left over to the end of resultant list. we can assume
  // this new list will be in sorted order
  return res.concat(l.slice(i)).concat(r.slice(j));
}

function mergeSort (ls) {
  // console.log('splitting', ls);
  // bottom out when we recieve a singleton
  if (ls.length === 1)  { return ls; }

  // more than one element? Divide list into left/right parts
  var mid   = Math.floor(ls.length/2);
  var left  = mergeSort(ls.slice(0, mid)) || [];
  var right = mergeSort(ls.slice(mid, ls.length)) || [];

  // console.log(left, ' ', right);
  return merge(left, right);
}

module.exports = {

  // genterate arbitrarily sized list of random integers
  generateRandomIntList: function (size, maxval) {
    var ret = [];
    for(var i=0; i<size; i++) {
      ret.push(Math.floor(Math.random() * maxval));
    }
    return ret;
  },

  // Bubblesort Solution:
  bubbleSort: function (ls) {
    for (var i=0; i<ls.length; i++){
      for (var j=ls.length; j > 0; j--) {
        if (ls[j] < ls[j-1]) {
          exchangeElements(ls, j, j-1);
        }
      }
    }
    return ls;
  },

  // Mergesort Solution
  doMergeSort: function (ls) {
    return mergeSort(ls);
  },

  // map sorting function to input list
  mapSort: function (ls, inputfn) {
    console.log('Copying array (not part of sorting...)');
    var tmpLs = ls.slice();

    // time the algorithm
    var start = process.hrtime();
    var res   = inputfn(tmpLs);
    var end   = process.hrtime();

    return {
      timeElapsed : Math.ceil((end[1] - start[1])/1000000),
      result      : res
    };
  }
};
