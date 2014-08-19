var countChars = function(input) {
  var counts = {};
  for (var i = 0; i < input.length; i++) {
    var c = input[i];
    counts[c] = counts[c] || 0;
    counts[c]++;
  }
  return counts;
};

var huffmanCode = function(input) {
  var charCounts = countChars(input);
  var pq = new PriorityQueue();

  for (var c in charCounts) {
    var n = charCounts[c];
    var tree = new Tree([c]);
    pq.insert(n, tree);
  }

  while (pq.size() > 1) {
    var first = pq.extract();
    var second = pq.extract();

    var tree1 = first.val;
    var tree2 = second.val;

    var key1 = first.key;
    var key2 = second.key;

    var newTree = new Tree(tree1.val.concat(tree2.val));
    newTree.left = tree1;
    newTree.right = tree2;
    pq.insert(key1+key2, newTree);
  }

  return pq.extract().val;
};

var encodeChar = function(c, huffman) {
  var output = "";
  while (huffman.val.length > 1) {
    if (huffman.left.val.indexOf(c) !== -1) {
      huffman = huffman.left;
      output += "0";
    } else if (huffman.right.val.indexOf(c) !== -1) {
      huffman = huffman.right;
      output += "1";
    } else {
      throw new Error("Character " + c + "is not in this Huffman tree.");
    }
  }
  return output;
};

var encodeString = function(input, huffman) {
  var output = "";
  for (var i = 0; i < input.length; i++) {
    output += encodeChar(input[i], huffman);
  }
  return output;
};

var decodeString = function(input, huffman) {
  var output = "";
  var currNode = huffman;
  for (var currIdx = 0; currIdx < input.length; currIdx++) {
    var currBit = input[currIdx];
    if (currBit === "0") {
      currNode = currNode.left;
    } else if (currBit === "1") {
      currNode = currNode.right;
    }
    if (currNode.val.length === 1) {
      output += currNode.val[0];
      currNode = huffman;
    }
  }
  return output;
};