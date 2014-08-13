/*
 YOUR TASK:  To fill in the following function.

 --- BASIC REQUIREMENTS ---
 * It should return a number equal to the area of the shape.

 --- EXTRA CREDIT ---
 * Have the algorithm only halt after a certain degree of precision has been reached.
 * Refine your algorithm to choose points in a "smarter" fashion.
 * Dig into base.js and improve performance there.

 --- AVAILABLE METHODS ---

 The following methods are available to you in the global scope:

 evalPoint: function(x, y)
 -- Returns "true" if a point is inside the shape, and false otherwise.

 getGraphDimensions: function()
 -- Returns an objects with the dimensions of the graph.
 -- Has properties x and y, each of which has properties min and max.
 (ex. { x:{min: 3, max: 10}, y:{min:-5, max: 6} })

 --- SOME THINGS TO THINK ABOUT ---
 * Which shapes are easier/harder to integrate?
 * What ratio of window size to shape size maximizes accuracy?
 *
 */

var integrate = function() {
//  return basicIntegration();
  return stratifiedSampling(16 * 100, 8);
}

// Given a bounding box, throw a dart at it randomly.
// Return true/false for a hit/miss.
var throwDart = function(box){
  x = box.x.min + Math.random() * (box.x.max - box.x.min);
  y = box.y.min + Math.random() * (box.y.max - box.y.min);
  return evalPoint(x,y);
}

// Break the box into N segments per side
var stratifiedSampling = function(attempts, segmentsPerSide) {
  attempts = attempts || 1000;
  segmentsPerSide = segmentsPerSide || 4;
  var i, hits = 0, box = getGraphDimensions(),
    s, subdivisions = segmentsPerSide * segmentsPerSide, subBox,
    width  = box.x.max - box.x.min,
    height = box.y.max - box.y.min,
    area = width * height;

  for (s=0; s<subdivisions; s++) {                // For every subdivision
    subBox = getBoundsForSubdivision(s);          // Get the subdivision's bounding box
    for (i=0; i<attempts/subdivisions; i++) {     // For every attempt that subdivision has
      if(throwDart(subBox)){ hits++ }             // Throw a dart at the box
    }
  }

  // Given an index for a subdivision, and assuming the same number of subdivisions wide and tall,
  // Return a box representing the subdivision's dimensions.
  function getBoundsForSubdivision(idx) {
    var row = Math.floor(idx / segmentsPerSide),
      col = idx % segmentsPerSide;

    var subBox =  {
      x: {
        min:  col    / segmentsPerSide * width + box.x.min, // ratio * global width + global min
        max: (col+1) / segmentsPerSide * width + box.x.min
      },
      y: {
        min:  row    / segmentsPerSide * width + box.y.min, // ratio * global width + global min
        max: (row+1) / segmentsPerSide * width + box.y.min
      }
    };
//    console.log(subBox);

    // Uncomment to constrict the segments and make it obvious the segmentation is working:
    subBox.x.max -= width/segmentsPerSide*.15;
    subBox.x.min += width/segmentsPerSide*.15;
    subBox.y.max -= width/segmentsPerSide*.15;
    subBox.y.min += width/segmentsPerSide*.15;

    return subBox;
  }

  return area * hits/attempts;
};
















// Randomly throw darts. Nothing fancy. Not used.
var basicIntegration = function(attempts) {
  attempts = attempts || 1000;
  var i, hits = 0, box = getGraphDimensions(),
    width = box.x.max - box.x.min,
    height = box.y.max - box.y.min,
    area = width * height;
  for (i=0; i<attempts; i++){
    if(throwDart(box)) { hits++; }
  }
  return area * hits / attempts;
}