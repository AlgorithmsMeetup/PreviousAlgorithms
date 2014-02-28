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

var integrate = function() {

    // Get the dimensions of the field
    var graphDimensions = getGraphDimensions();
    var xLength = (graphDimensions.x.max - graphDimensions.x.min);
    var yHeight = (graphDimensions.y.max - graphDimensions.y.min);
    var area = xLength * yHeight 
    
    
    //Run the loop X times
    var x = 1000;
    var numInside=0;

    for (var i = 0; i< x; i++){
    
    // Generate the random number
    var fireX = graphDimensions.x.min + Math.random()*xLength;
    var fireY = graphDimensions.y.min + Math.random()*yHeight;
    
    //console.log(fireX);
    // console.log(fireY);

    if (evalPoint(fireX,fireY)) numInside++;
    // console.log(numInside);

    };
    console.log(numInside);
    console.log(x);
    console.log(area);

    return numInside / x * area;

};
