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
    return;
  } else {
    var quadrant = this.box.findQuadrantForPoint(point);
    if (!this[quadrant]) {
      this[quadrant] = new Quadtree(this.box.getDimensionsForQuadrant(quadrant));
    }
    this[quadrant].insert(point);
  }
};

Quadtree.prototype.findWithin = function(box) {

};

var Point = function(x, y) {
  this.x = x;
  this.y = y;
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
  var inX = point.x >= this.minX && point.x <= this.maxX;
  var inY = point.y >= this.minY && point.y <= this.maxY;
  return inX && inY;
};

Box.prototype.hasOverlap = function(that) {
  var xOverlap = this.maxX >= that.minX && this.minX <= that.maxX;
  var yOverlap = this.maxY >= that.minY && this.minY <= that.maxY;
  return xOverlap && yOverlap;
};

Box.prototype.getDimensionsForQuadrant = function(quadrant) {
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

Box.prototype.findQuadrantForPoint = function(point) {
  if (!this.contains(point)) {
    throw new Error("Quadrant " + quadrant + " does not contain ", point);
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