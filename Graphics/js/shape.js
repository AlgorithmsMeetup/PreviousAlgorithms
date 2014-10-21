var Shape = function() {
  this.points = [];
};

var Cube = function(center, radius) {
  var cx = center.x;
  var cxp = center.x + radius;
  var cxm = center.x - radius;
  var cy = center.y;
  var cyp = center.y + radius;
  var cym = center.y - radius;
  var cz = center.z;
  var czp = center.z + radius;
  var czm = center.z - radius;
  
  this.points = [
    new Point3D(cxp, cyp, czp),
    new Point3D(cxm, cyp, czp),
    new Point3D(cxp, cym, czp),
    new Point3D(cxp, cyp, czm),
    new Point3D(cxm, cym, czp),
    new Point3D(cxm, cyp, czm),
    new Point3D(cxp, cym, czm),
    new Point3D(cxm, cym, czm),

    new Point3D(cx, cyp, czp),
    new Point3D(cx, cym, czp),
    new Point3D(cx, cyp, czm),
    new Point3D(cx, cym, czm),
    
    new Point3D(cxp, cy, czp),
    new Point3D(cxm, cy, czp),
    new Point3D(cxp, cy, czm),
    new Point3D(cxm, cy, czm),
  
    new Point3D(cxp, cyp, cz),
    new Point3D(cxm, cyp, cz),
    new Point3D(cxp, cym, cz),
    new Point3D(cxm, cym, cz),
  ];
};

Cube.prototype = new Shape;