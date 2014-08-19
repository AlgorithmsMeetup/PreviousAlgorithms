describe("Huffman Coding", function() {
  var loremIpsum = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut odio. Nam sed est. Nam a risus et est iaculis adipiscing. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer ut justo. In tincidunt viverra nisl. Donec dictum malesuada magna. Curabitur id nibh auctor tellus adipiscing pharetra. Fusce vel justo non orci semper feugiat. Cras eu leo at purus ultrices tristique. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Cras consequat magna ac tellus. Duis sed metus sit amet nunc faucibus blandit. Fusce tempus cursus urna. Sed bibendum, dolor et volutpat nonummy, wisi justo convallis neque, eu feugiat leo ligula nec quam. Nulla in mi. Integer ac mauris vel ligula laoreet tristique. Nunc eget tortor in diam rhoncus vehicula. Nulla quis mi. Fusce porta fringilla mauris. Vestibulum sed dolor. Aliquam tincidunt interdum arcu. Vestibulum eget lacus. Curabitur pellentesque egestas lectus. Duis dolor. Aliquam erat volutpat. Aliquam erat volutpat. Duis egestas rhoncus dui. Sed iaculis, metus et mollis tincidunt, mauris dolor ornare odio, in cursus justo felis sit amet arcu. Aenean sollicitudin. Duis lectus leo, eleifend mollis, consequat ut, venenatis at, ante. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";

  var pow2Ceil = function(n) {
    n+=(n===0);
    n--;
    n|=n>>1;
    n|=n>>2;
    n|=n>>4;
    n|=n>>8;
    n|=n>>16;
    n++;
    return n;
  };

  var demoCountChars = function(input) {
    var counts = {};
    for (var i = 0; i < input.length; i++) {
      var c = input[i];
      counts[c] = counts[c] || 0;
      counts[c]++;
    }
    return counts;
  };

  var demoMakeHuffmanTree = function(input) {
    var charCounts = demoCountChars(input);
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

  var easyEncodeTests = function() {
    it("encodes 'a'", function() {
      expect(encodeString("a", huffman)).to.be("0");
    });

    it("encodes 'b'", function() {
      expect(encodeString("b", huffman)).to.be("10");
    });

    it("encodes 'c'", function() {
      expect(encodeString("c", huffman)).to.be("110");
    });

    it("encodes 'd'", function() {
      expect(encodeString("d", huffman)).to.be("111");
    });

    it("encodes 'bc", function() {
      expect(encodeString("bc", huffman)).to.be("10110");
    });

    it("encodes 'abcd'", function() {
      expect(encodeString("abcd", huffman)).to.be("010110111");
    });

    it("encodes 'aabaccdaabacda", function() {
      expect(encodeString("aabaccdaabacda", huffman)).to.be('00100110110111001001101110');
    });
  };

  var hardEncodeTests = function() {
    it("encodes 'a'", function() {
      expect(encodeString('a', huffman)).to.be('1000');
    });

    it("encodes 'j'", function() {
      expect(encodeString('j', huffman)).to.be('101011100');
    });

    it("encodes 'abcd'", function() {
      expect(encodeString('abcd', huffman)).to.be('100010101010110010100');
    });

    it("encodes 'the quick brown fox jumps over the lazy dog.'", function() {
      expect(encodeString('the quick brown fox jumps over the lazy dog.', huffman)).to.be('101101101000000110101010010011110011000110100111101010101001001010110101011111111100100010010110101111001101010111001001111100110110111110010101000000000101101011011010000001100011100001000111001000110110101000101010010010011');
    });
  };

  var easyDecodeTests = function() {
    it("decodes 'a'", function() {
      expect(decodeString("0", huffman)).to.be("a");
    });

    it("decodes 'b'", function() {
      expect(decodeString("10", huffman)).to.be("b");
    });

    it("decodes 'c'", function() {
      expect(decodeString("110", huffman)).to.be("c");
    });

    it("decodes 'd'", function() {
      expect(decodeString("111", huffman)).to.be("d");
    });

    it("decodes 'bc", function() {
      expect(decodeString("10110", huffman)).to.be("bc");
    });

    it("decodes 'abcd'", function() {
      expect(decodeString("010110111", huffman)).to.be("abcd");
    });

    it("decodes 'aabaccdaabacda", function() {
      expect(decodeString("00100110110111001001101110", huffman)).to.be("aabaccdaabacda");
    });
  };

  var hardDecodeTests = function() {
    it("decodes 'a'", function() {
      expect(decodeString('1000', huffman)).to.be('a');
    });

    it("decodes 'j'", function() {
      expect(decodeString('101011100', huffman)).to.be('j');
    });

    it("decodes 'abcd'", function() {
      expect(decodeString('100010101010110010100', huffman)).to.be('abcd');
    });

    it("decodes 'the quick brown fox jumps over the lazy dog.'", function() {
      expect(decodeString('101101101000000110101010010011110011000110100111101010101001001010110101011111111100100010010110101111001101010111001001111100110110111110010101000000000101101011011010000001100011100001000111001000110110101000101010010010011', huffman)).to.be('the quick brown fox jumps over the lazy dog.');
    });
  };

  var huffman;

  describe("encodeString", function() {
    describe("small character set: 'aaabbcd", function() {
      beforeEach(function(){
        huffman = demoMakeHuffmanTree("aaabbcd");
      });
      easyEncodeTests();
    });

    describe("large character set: 6 paragraphs of lorum ipsum", function() {
      beforeEach(function(){
        huffman = demoMakeHuffmanTree(loremIpsum);
      });

      hardEncodeTests();
    });
  });

  describe("decodeString", function() {
    describe("small character set: 'aaabbcd", function() {
      beforeEach(function(){
        huffman = demoMakeHuffmanTree("aaabbcd");
      });

      easyDecodeTests();
    });

    describe("large character set: 6 paragraphs of lorum ipsum", function() {
      beforeEach(function(){
        huffman = demoMakeHuffmanTree(loremIpsum);
      });

      hardDecodeTests();
    });
  });

  describe("makeHuffmanTree", function() {
    beforeEach(function() {
      huffman = makeHuffmanTree(loremIpsum);
    });

    hardEncodeTests();
    hardDecodeTests();
  });
});




















