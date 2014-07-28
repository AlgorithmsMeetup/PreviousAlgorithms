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

Point.prototype.toString = function() {
  return "{x: " + this.x + ", y: " + this.y + "}";
};