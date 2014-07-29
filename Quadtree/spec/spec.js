describe("Quadtree tests", function() {

  var quadtree, bigFilledQuadtree;
  before(function() {
    bigFilledQuadtree = new Quadtree(new Box(-10, -10, 510, 510));
    for (var x = 0; x <= 500; x++) {
      for (var y = 0; y <= 500; y++) {
        bigFilledQuadtree.insert(new Point(x, y));
      }
    }
  });

  beforeEach(function() {
    var box = new Box(-10, -10, 10, 10);
    quadtree = new Quadtree(box);
  });

  describe("#insert", function() {
    it("calls 'insert' once without error", function() {
      quadtree.insert(new Point(1, 1));
    });

    it("calls 'insert' 3 times without error", function() {
      quadtree.insert(new Point(1, 1));
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(-2, 4));
    });

    it("calls 'insert' 100 times without error", function() {
      var x, y;
      for (var i = 0; i < 100; i++) {
        x = _.random(-10, 10);
        y = _.random(-10, 10);
        quadtree.insert(new Point(x, y));
      }
    });

    it("calls 'insert' 40000 times without error", function() {
      var quadtree = new Quadtree(new Box(-10, -10, 310, 310));
      for (var x = 0; x < 300; x++) {
        for (var y = 0; y < 300; y++) {
          quadtree.insert(new Point(x, y));
        }
      }
    });

    it("adds a first point without creating subtrees", function() {
      quadtree.insert(new Point(0, 0));
      expectPoint(quadtree.point, 0, 0);
      expect(quadtree.SW).to.not.be.ok();
      expect(quadtree.SE).to.not.be.ok();
      expect(quadtree.NW).to.not.be.ok();
      expect(quadtree.NE).to.not.be.ok();
    });

    it("adds a second point into the correct subtree", function() {
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(1, 1));
      expect(quadtree.NE).to.be.a(Quadtree);
      expectPoint(quadtree.point, 0, 0);
      expectPoint(quadtree.NE.point, 1, 1);
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
      expectPoint(quadtree.point, 0, 0);
      expectPoint(quadtree.SW.point, -3, -4);
      expectPoint(quadtree.SE.point, 7, -4);
      expectPoint(quadtree.NW.point, -5, 2);
      expectPoint(quadtree.NE.point, 1, 1);
      expectPoint(quadtree.NE.SW.point, 2, 2);
      expectPoint(quadtree.NE.SE.point, 9, 2);
      expectPoint(quadtree.NE.NE.point, 9, 9);
    });
  });

  describe("#findPointsWithin", function() {
    it("Finds one point in the search box.  Point: (0, 0).  Box: (-10, -10, 10, 10).", function() {
      quadtree.insert(new Point(0, 0));
      var points = quadtree.findPointsWithin(quadtree.box);
      expectPoints(points, [new Point(0, 0)]);
    });

    it("Does not find point out of the search box.  Point: (0, 0).  Box: (1, 1, 3, 3)", function() {
      quadtree.insert(new Point(0, 0));
      var points = quadtree.findPointsWithin(new Box(1, 1, 3, 3));
      expectPoints(points, []);
    });

    it("Finds the three points in the search box.  Points: (1, 1), (-1, 1), (0, -1).  Box: (-10, -10, 10, 10)", function() {
      quadtree.insert(new Point(1, 1));
      quadtree.insert(new Point(-1, 1));
      quadtree.insert(new Point(0, -1));
      var points = quadtree.findPointsWithin(quadtree.box);
      expectPoints(points, [new Point(1, 1), new Point(-1, 1), new Point(0, -1)]);
    });

    it("Finds the two points in the search box.  Doesn't find the two points out of the box.  Points: (1, 1), (-1, 1), (0, -1), (-1, 2).  Box: (0, -10, 10, 10)", function() {
      quadtree.insert(new Point(1, 1));
      quadtree.insert(new Point(-1, 1));
      quadtree.insert(new Point(0, -1));
      quadtree.insert(new Point(-1, 2));
      var points = quadtree.findPointsWithin(new Box(0, -10, 10, 10));
      expectPoints(points, [new Point(1, 1), new Point(0, -1)]);
    });

    it("Finds 100 points, all within (-10, -10, 10, 10)", function() {
      var x, y;
      for (var i = 0; i < 100; i++) {
        x = _.random(-10, 10);
        y = _.random(-10, 10);
        quadtree.insert(new Point(x, y));
      }
      var points = quadtree.findPointsWithin(quadtree.box);
      expect(points).to.have.length(100);
    });

    it("Finds only the points inside a range.  100 points, 25 with x < -5, 75 with x >= -5, finds all points with x >= -5.", function() {
      var x, y;
      for (var i = 0; i < 100; i++) {
        if (i % 4) {
          x = _.random(-5, 10);
          y = _.random(-10, 10);
        } else {
          x = _.random(-10, -6);
          y = _.random(-10, -10);
        }
        quadtree.insert(new Point(x, y));
      }
      var points = quadtree.findPointsWithin(new Box(-5, -10, 10, 10));
      expect(points).to.have.length(75);
    });

    it("Works on large trees.  Properly searches 360000 points, finding 3000.", function() {
      var points = bigFilledQuadtree.findPointsWithin(new Box(220, 280, 319, 309));
      expect(points.length).to.be(3000);
    });
  });

  describe("#findNearestPointTo", function() {
    it("If quadtree is empty, returns null", function() {
      var point = quadtree.findNearestPointTo(new Point(0, 0));
      expect(point).to.be(null);
    });

    it("If quadtree contains only 1 point, (0, 0), finds that point, with a query of (0, 0).", function() {
      quadtree.insert(new Point(0, 0));
      var point = quadtree.findNearestPointTo(new Point(0, 0));
      expectPoint(point, 0, 0);
    });

    it("If quadtree contains only 1 point, (0, 0), finds that point, with a query of (1, 1).", function() {
      quadtree.insert(new Point(0, 0));
      var point = quadtree.findNearestPointTo(new Point(1, 1));
      expectPoint(point, 0, 0);
    });

    it("If quadtree contains 2 points, (0, 0) and (5, 5), finds (0, 0) with a query of (0, 0)", function() {
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(5, 5));
      var point = quadtree.findNearestPointTo(new Point(0, 0));
      expectPoint(point, 0, 0);
    });

    it("If quadtree contains 2 points, (0, 0) and (5, 5), finds (0, 0) with a query of (1, 1)", function() {
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(5, 5));
      var point = quadtree.findNearestPointTo(new Point(1, 1));
      expectPoint(point, 0, 0);
    });

    it("If quadtree contains 4 points, (0, 0), (5, 0), (0, 5), and (5, 5), finds (5, 0) as the closest to (3, 2)", function() {
      quadtree.insert(new Point(0, 0));
      quadtree.insert(new Point(5, 0));
      quadtree.insert(new Point(0, 5));
      quadtree.insert(new Point(5, 5));
      var point = quadtree.findNearestPointTo(new Point(3, 2));
      expectPoint(point, 5, 0);
    });

    it("If the quadtree has all points with x and y between 0 and 500, finds (500, 494) as the closest point to (1000, 494)", function() {
      var point = bigFilledQuadtree.findNearestPointTo(new Point(1000, 494));
      expectPoint(point, 500, 494);
    });

    it("If the quadtree has all points with x and y between 0 and 500, finds (173, 329) as the closest point to (173.4, 328.9)", function() {
      var point = bigFilledQuadtree.findNearestPointTo(new Point(173.4, 328.9));
      expectPoint(point, 173, 329);
    });

    it("Works quickly. Performs 100 queries for random points (should be under 1000 ms)", function() {
      for (var i = 0; i < 100; i++) {
        var x = (_.random(1000, 5000))/10 - 0.05;
        var y = (_.random(1000, 5000))/10 - 0.05;
        var point = bigFilledQuadtree.findNearestPointTo(new Point(x, y));
        expectPoint(point, Math.round(x), Math.round(y));
      }
    });
  });

});

var expectPoints = function(actual, expected) {
  expect(actual).to.have.length(expected.length);
  actual = actual.sort(pointsArrayComparator);
  expected = expected.sort(pointsArrayComparator);
  for (var i = 0; i < actual.length; i++) {
    var actualPoint = actual[i];
    var expectedPoint = expected[i];
    expect(actualPoint).to.have.property("x", expectedPoint.x);
    expect(actualPoint).to.have.property("y", expectedPoint.y);
  }
};

var pointsArrayComparator = function(a, b) {
  var xDiff = a.x - b.x;
  var yDiff = a.y - b.y;
  return xDiff ? xDiff : yDiff;
};

var expectPoint = function(actual, expected) {
  if (typeof expected === "number") {
    expected = new Point(arguments[1], arguments[2]);
  }
  expect(actual).to.be.a(Point);
  expect(Object.keys(actual)).to.have.length(2);
  expect(actual.x).to.be(expected.x);
  expect(actual.y).to.be(expected.y);
};
