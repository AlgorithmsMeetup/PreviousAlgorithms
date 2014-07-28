var Quadtree = function(box) {
  this.box = box;
  this.point = null;
  this.SW = null;
  this.SE = null;
  this.NW = null;
  this.NE = null;
};

Quadtree.prototype.insert = function(point) {
  if (!this.point) {
    this.point = point;
  } else {
    var quadrant = this.box.findQuadrantForPoint(point);
    if (!this[quadrant]) {
      this[quadrant] = new Quadtree(this.box.getQuadrant(quadrant));
    }
    this[quadrant].insert(point);
  }
};

Quadtree.prototype.findPointsWithin = function(searchBox) {
  var points = [];
  if (this.point && searchBox.contains(this.point)) {
    points.push(this.point);
  }

  if (this.SW && searchBox.overlaps(this.SW.box)) {
    points = points.concat(this.SW.findPointsWithin(searchBox));
  }
  if (this.SE && searchBox.overlaps(this.SE.box)) {
    points = points.concat(this.SE.findPointsWithin(searchBox));
  }
  if (this.NW && searchBox.overlaps(this.NW.box)) {
    points = points.concat(this.NW.findPointsWithin(searchBox));
  }
  if (this.NE && searchBox.overlaps(this.NE.box)) {
    points = points.concat(this.NE.findPointsWithin(searchBox));
  }

  return points;
};

Quadtree.prototype.findNearestPointTo = function(target) {
  if (!this.point) {
    return null;
  }

  var xDist = 1;
  var yDist = 1;

  var searchBox = new Box(target.x - xDist, target.y - yDist, target.x + xDist, target.y + yDist);

  var points = this.findPointsWithin(searchBox);
  while (points.length === 0) {
    searchBox.expand();
    points = this.findPointsWithin(searchBox);
  }

  var best = null;
  var bestDist = Infinity;
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    var dist = point.distanceTo(target);
    if (dist < bestDist) {
      bestDist = dist;
      best = point;
    }
  }
  return best;
};

