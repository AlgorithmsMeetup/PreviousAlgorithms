$(document).ready(function() {
  var cube = new Cube(new Point3D(0, 0, 0), 100);
  var rendered = cube.points.map(function(p) {
    return new Point2D(p.x, p.y);
  });
});