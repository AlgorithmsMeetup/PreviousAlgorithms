var Point2D = function(x, y) {
  this.move(x, y);
};

Point2D.prototype.remove = function() {
  if (this.el) this.el.remove();
};

Point2D.prototype.render = function() {
  this.remove();
  var newEl = $("<div class='point'></div>");
  newEl.css({top: 256 - this.y, left: this.x + 256});
  $('.viewport').append(newEl);
  this.el = newEl;
};

Point2D.prototype.move = function(x, y) {
  this.x = x;
  this.y = y;
  this.render();
};