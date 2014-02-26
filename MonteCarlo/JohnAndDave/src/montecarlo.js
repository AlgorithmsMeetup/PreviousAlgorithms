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


// This is the arbitrary precision version

var integrate = function() {
    console.log("integrate is hit");
    var precision = 0.01; 

    var res = getGraphDimensions();
    var area = Math.abs((res.x.max - res.x.min)) * Math.abs((res.y.max - res.y.min));
    var genRandom = function(res) {
        var x1 = (Math.random() * (res.x.max - res.x.min)) + res.x.min;
        var y1 = (Math.random() * (res.y.max - res.y.min)) + res.y.min;
        return {x:x1,y:y1}
    }
    var hit = 0;
    var miss = 0;
    var delta = 100000;
    var prevarea = 0;
    var total = 0;
    while (delta > precision) {
        for (var i = 0; i < 100; i++) {
            var obj = genRandom(res);
            if (evalPoint(obj.x,obj.y)) 
                hit++;
            else 
                miss++;
        }
        total = hit + miss;
        var percentage = hit / total;
        var integratedarea = percentage * area;
        delta = Math.abs(integratedarea - prevarea);
        prevarea = integratedarea;
    }
    console.log('total hit: ' + hit + " total miss: " + miss + " total: " + total);
    var percentage = hit / total;
    var integratedarea = percentage * area;
    return integratedarea;
};

/*
var integrate = function() {
    console.log("integrate is hit");
    
    var res = getGraphDimensions();
    var area = Math.abs((res.x.max - res.x.min)) * Math.abs((res.y.max - res.y.min));
    var genRandom = function(res) {
        var x1 = (Math.random() * (res.x.max - res.x.min)) + res.x.min;
        var y1 = (Math.random() * (res.y.max - res.y.min)) + res.y.min;
        return {x:x1,y:y1}
    }
    var hit = 0;
    var miss = 0;
    for (var i = 0; i < 1000; i++) {
        var obj = genRandom(res);
        if (evalPoint(obj.x,obj.y)) 
            hit++;
        else 
            miss++;
    }
    var total = hit + miss;
    console.log('total hit: ' + hit + " total miss: " + miss + " total: " + total);
    var percentage = hit / total;
    var integratedarea = percentage * area;
    console.log("percentage: " + percentage.toFixed(2));
    console.log("total area of square :" + area.toFixed(2));
    console.log("integrated area;" + integratedarea.toFixed(2));
    $('span#integrationResult').html(integratedarea.toFixed(2));
    
};
*/
