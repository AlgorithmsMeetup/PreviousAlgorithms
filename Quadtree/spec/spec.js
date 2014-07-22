describe("Quadtree tests", function() {

  var quadtree;

  beforeEach(function() {
    var box = new Box(-10, -10, 10, 10);
    quadtree = new Quadtree(box);
  });

  describe("insertion", function() {
    it("inserts one point without error", function() {
      quadtree.insert(new Point(1, 1));
    });

    it("inserts three points without error", function() {
      quadtree.insert(new Point(1, 1));
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(-2, 4));
    });

    it("inserts one hundred points without error", function() {
      var x, y;
      for (var i = 0; i < 100; i++) {
        x = _.random(-10, 10);
        y = _.random(-10, 10);
        quadtree.insert(new Point(x, y));
      }
    });

    it("adds a first point without creating subtrees", function() {
      quadtree.insert(new Point(0, 0));
      expectPoint(quadtree, 0, 0);
      expect(quadtree.SW).to.not.be.ok();
      expect(quadtree.SE).to.not.be.ok();
      expect(quadtree.NW).to.not.be.ok();
      expect(quadtree.NE).to.not.be.ok();
    });

    it("adds a second point into the correct subtree", function() {
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(1, 1));
      // expect(quadtree.SW).to.be.a(Quadtree);
      // expect(quadtree.SE).to.be.a(Quadtree);
      // expect(quadtree.NW).to.be.a(Quadtree);
      expect(quadtree.NE).to.be.a(Quadtree);
      expectPoint(quadtree, 0, 0);
      expectPoint(quadtree.NE, 1, 1);
    });

    it("adds several points into the correct subtrees", function() {
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(1, 1));
      quadtree.insert(new Point(-3, -4));
      quadtree.insert(new Point(7, -4));
      quadtree.insert(new Point(-5, 2));
      quadtree.insert(new Point(2, 2));
      quadtree.insert(new Point(9, 2));
      quadtree.insert(new Point(9, 9));
      expect(quadtree.SW).to.be.a(Quadtree);
      expect(quadtree.SE).to.be.a(Quadtree);
      expect(quadtree.NW).to.be.a(Quadtree);
      expect(quadtree.NE).to.be.a(Quadtree);
      expect(quadtree.NE.SW).to.be.a(Quadtree);
      expect(quadtree.NE.SE).to.be.a(Quadtree);
      expect(quadtree.NE.NE).to.be.a(Quadtree);
      expectPoint(quadtree, 0, 0);
      expectPoint(quadtree.SW, -3, -4);
      expectPoint(quadtree.SE, 7, -4);
      expectPoint(quadtree.NW, -5, 2);
      expectPoint(quadtree.NE, 1, 1);
      expectPoint(quadtree.NE.SW, 2, 2);
      expectPoint(quadtree.NE.SE, 9, 2);
      expectPoint(quadtree.NE.NE, 9, 9);
    });
  });

});

expectPoint = function(quadtree, x, y) {
  expect(quadtree.point).to.be.a(Point);
  expect(Object.keys(quadtree.point)).to.have.length(2);
  expect(quadtree.point.x).to.be(x);
  expect(quadtree.point.y).to.be(y);
};
