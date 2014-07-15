var assertArrayEquals = function(array1, array2) {
  expect(array1).to.have.length(array2.length);
  for (var i = 0; i < array1.length; i++) {
    expect(array1[i]).to.equal(array2[i]);
  }
};

describe("Basic building blocks", function() {
  describe("map", function() {
    it("doubling numbers", function() {
      var result = map([1, 2, 3], function(x) {return x*2;});
      assertArrayEquals(result, [2, 4, 6]);
    });

    it("lengths of strings", function() {
      var result = map(["hello", "you", "prig"], function(s) {return s.length; });
      assertArrayEquals(result, [5, 3, 4]);
    });

    it("truthiness", function() {
      var result = map([null, "", 1, "a", undefined], function(x) {return !!x;});
      assertArrayEquals(result, [false, false, true, true, false]);
    });

    it("can use the index", function() {
      var result = map([1, 2, 3, 2, 1], function(x, i) {return x + i;});
      assertArrayEquals(result, [1, 3, 5, 5, 5]);
    });
  });

  describe("filter", function() {
    it("even numbers", function() {
      var result = filter([1, 2, 3, 4, 5], function(x) {return x % 2 === 0;});
      assertArrayEquals(result, [2, 4]);
    });

    it("strings", function() {
      var result = filter(["a", 1, true, "goodbye"], function(x) {return typeof x === "string";});
      assertArrayEquals(result, ["a", "goodbye"]);
    });

    it("can use the index", function() {
      var result = filter([1, 2, 3, 4, 5, 6], function(x, i) {return i === 3 || i === 2;});
      assertArrayEquals(result, [3, 4]);
    });
  });

  describe("reduce", function() {
    it("sum of array", function() {
      var result = reduce([1, 2, 3, 4, 5], function(partial, elem) {return partial + elem;}, 0);
      expect(result).to.equal(15);
    });

    it("concats strings", function() {
      var result = reduce(["bi", "bim", "bap"], function(partial, elem) {return partial + elem;}, '');
      expect(result).to.equal("bibimbap");
    });
  });
});



describe("More specialized functions", function() {

  it("every", function() {
    expect(every([1, 2, 3, 4, 5, 6], function(x) {return x < 10;})).to.be(true);
    expect(every([1, 2, 3, 4, 25, 6], function(x) {return x < 10;})).to.be(false);
  });

  it("some", function() {
    expect(every([1, 2, 3, 4, 25, 6], function(x) {return x > 10;})).to.be(true);
    expect(every([1, 2, 3, 4, 5, 6], function(x) {return x > 10;})).to.be(false);
  });

  it("unique", function() {
    var result = unique(["a", "ab", "a", "b", "ab", "ba"]);
    assertArrayEquals(result, ["a", "ab", "b", "ba"]);
  });

  it("flatten", function() {
    var result = flatten([1, 2, [3, [4]]]);
    assertArrayEquals(result, [1, 2, 3, 4]);
  });

  it("contains", function() {
    expect(contains([1, 2, 3, 4], 1)).to.be(true);
    expect(contains([1, 2, 3, 4], 0)).to.be(false);
  });

});


checkIfFunctionalSolution = function(func) {
  func = func.toString();
  expect(func).to.not.contain("for(");
  expect(func).to.not.contain("for (");
  expect(func).to.not.contain("if(");
  expect(func).to.not.contain("if (");
  expect(func).to.not.contain("while(");
  expect(func).to.not.contain("while (");
};

describe("Applied problems", function() {
  it("Sum an array", function() {
    expect(sumOfArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).to.be(55);
    checkIfFunctionalSolution(sumOfArray);
  });

  it("All numbers that equal their position in the array", function() {
    assertArrayEquals(positionMatch([0, 2, 1, 4, 3, 5]), [0, 5]);
    checkIfFunctionalSolution(positionMatch);
  });

  it("Counting the number of unique first names in this sequence", function() {
    var result = uniqueFirstNames(["John Bonham", "Roger Waters", "John Lennon", "Nick Moon", "Roger Daltry", "Nick Cave", "Jimmy Hendrix", "Jimmy Buffet", "Jimmy Page", "Frank Zappa"]);
    expect(result).to.equal(5);
    checkIfFunctionalSolution(uniqueFirstNames);
  });

  it("Palindrome numbers", function() {
    assertArrayEquals(palindromeNumbers([1, 12, 131, 34534, 34543, 198, 19891]), [1, 131, 34543, 19891]);
    checkIfFunctionalSolution(palindromeNumbers);
  });

  it("Indexing strings by their length", function() {
    var result = indexByLength(["hello", "satan", "this", "is", "your", "dog"]);
    var answer = [undefined, undefined, ["is"], ["dog"], ["this", "your"], ["hello", "satan"]];
    expect(JSON.stringify(result)).to.equal(JSON.stringify(answer));
    checkIfFunctionalSolution(indexByLength);
  });

  it("Returns the names of all people over 65 or with two or more children", function() {
    var people = [
      {name: "Fred", age: 74, children: ["Bob", "Jane"]},
      {name: "Sal", age: 59, children: ["Sam", "Sally"]},
      {name: "Rita", age: 66, children: ["Rob"]},
      {name: "Linda", age: 56, children: ["Rick", "James", "Jose"]}
    ];
    var filtered = olderOrWithChildren(people);
    assertArrayEquals(filtered, ["Fred", "Sal", "Linda"]);
    checkIfFunctionalSolution(olderOrWithChildren);
  });
});
