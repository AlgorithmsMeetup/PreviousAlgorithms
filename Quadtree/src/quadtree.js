var Quadtree = function(box) {
  this.box = box;
  this.point = null;
  this.SW = null;
  this.SE = null;
  this.NW = null;
  this.NE = null;
};

Quadtree.prototype.isEmpty = function() {
  return !this.point;
};

Quadtree.prototype.insert = function(point) {
  if (this.isEmpty()) {
    this.point = point;
    return;
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
  if (!this.isEmpty() && searchBox.contains(this.point)) {
    points.push(this.point);
  }
  if (this.SW) {
    points = points.concat(this.SW.findPointsWithin(searchBox));
  }
  if (this.SE) {
    points = points.concat(this.SE.findPointsWithin(searchBox));
  }
  if (this.NW) {
    points = points.concat(this.NW.findPointsWithin(searchBox));
  }
  if (this.NE) {
    points = points.concat(this.NE.findPointsWithin(searchBox));
  }

  return points;
};

Quadtree.prototype.findNearestPointTo = function(target) {
  if (this.isEmpty()) {
    return null;
  }

  var xDist = (this.box.maxX - this.box.minX)/10;
  var yDist = (this.box.maxY - this.box.minY)/10;

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

var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype.isIn = function(box) {
  if (!box) {
    throw new Error("No box passed to Point.isIn");
  }
  var inX = this.x >= box.minX && this.x <= box.maxX;
  var inY = this.y >= box.minY && this.y <= box.maxY;
  return inX && inY;
};

Point.prototype.distanceTo = function(point) {
  if (!point) {
    throw new Error("No point passed to Point.distanceTo");
  }
  var dx = point.x - this.x;
  var dy = point.y - this.y;
  return Math.sqrt(dx*dx + dy*dy);
};

Point.prototype.squareDistanceTo = function(point) {
  if (!point) {
    throw new Error("No point passed to Point.squareDistanceTo");
  }
  var dx = point.x - this.x;
  var dy = point.y - this.y;
  return dx*dx + dy*dy;
};

Point.prototype.toString = function() {
  return "{x: " + this.x + ", y: " + this.y + "}";
};

var Box = function(minX, minY, maxX, maxY) {
  if (minX > maxX) {
    throw new Error("Illegal x dimensions: " + minX + ", " + maxX);
  }
  if (minY > maxY) {
    throw new Error("Illegal y dimensions: " + minY + ", " + maxY);
  }

  this.minX = minX;
  this.minY = minY;
  this.maxX = maxX;
  this.maxY = maxY;

  this.midX = (minX + maxX)/2;
  this.midY = (minY + maxY)/2;
};

Box.prototype.contains = function(point) {
  if (!point) {
    throw new Error("No point passed to Box.contains");
  }
  var inX = point.x >= this.minX && point.x <= this.maxX;
  var inY = point.y >= this.minY && point.y <= this.maxY;
  return inX && inY;
};

Box.prototype.overlaps = function(that) {
  if (!that) {
    throw new Error("No box passed to Box.overlaps");
  }
  var xOverlap = this.maxX >= that.minX && this.minX <= that.maxX;
  var yOverlap = this.maxY >= that.minY && this.minY <= that.maxY;
  return xOverlap && yOverlap;
};

Box.prototype.getQuadrant = function(quadrant) {
  if (quadrant === "SW") {
    return new Box(this.minX, this.minY, this.midX, this.midY);
  } else if (quadrant === "NW") {
    return new Box(this.minX, this.midY, this.midX, this.maxY);
  } else if (quadrant === "SE") {
    return new Box(this.midX, this.minY, this.maxX, this.midY);
  } else if (quadrant === "NE") {
    return new Box(this.midX, this.midY, this.maxX, this.maxY);
  } else {
    throw new Error("Quadrant " + quadrant + " is not one of: ['SW', 'SE', 'NW', 'NE']");
  }
};

Box.prototype.shrink = function() {
  var minX = (this.minX + this.midX)/2;
  var minY = (this.minY + this.midY)/2;
  var maxX = (this.maxX + this.midX)/2;
  var maxY = (this.maxY + this.midY)/2;

  this.minX = minX;
  this.minY = minY;
  this.maxX = maxX;
  this.maxY = maxY;
};

Box.prototype.expand = function() {
  var minX = 2*this.minX - this.midX;
  var minY = 2*this.minY - this.midY;
  var maxX = 2*this.maxX - this.midX;
  var maxY = 2*this.maxY - this.midY;

  this.minX = minX;
  this.minY = minY;
  this.maxX = maxX;
  this.maxY = maxY;
};

Box.prototype.toString = function() {
  return "{minX: " + this.minX + ", minY: " + this.minY + ", maxX: " + this.maxX + ", maxY: " + this.maxY + "}";
};

Box.prototype.findQuadrantForPoint = function(point) {
  if (!point) {
    throw new Error("No point passed to Box.findQuadrantForPoint");
  }
  if (!this.contains(point)) {
    throw new Error("Point" + point + " is not inside box " + this);
  }

  if (point.x <= this.midX && point.y <= this.midY) {
    return "SW";
  } else if (point.x <= this.midX) {
    return "NW";
  } else if (point.y <= this.midY) {
    return "SE";
  } else {
    return "NE";
  }
};