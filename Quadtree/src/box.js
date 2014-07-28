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