$(document).on('ready', function() {
  var board = JXG.JSXGraph.initBoard('box', {boundingbox: [-5, 5, 5, -5], axis:true});
  var points = [];
  var inequalities = [];
  var xgt = null;
  var xlt = null;
  var pxSize = null;
  var hitOrMissContext = document.getElementById('HitsAndMisses').getContext('2d');
  hitOrMissContext.globalAlpha = 0.6;


  //
  // Methods for the solution.
  //

  window.getGraphDimensions = function() {
    var minx = Number($('#minx').val());
    var maxx = Number($('#maxx').val());
    var miny = Number($('#miny').val());
    var maxy = Number($('#maxy').val());

    return {
      x: {
        min: minx,
        max: maxx
      },
      y: {
        min: miny,
        max: maxy
      }
    };
  };

  window.evalPoint = function(x, y) {

    var inside = true;

    if ((xlt !== null && x > xlt) || (xgt !== null && x < xgt)) {
      inside = false;
    } else {
      for (var i = 0; i < inequalities.length; i++) {
        var inequality = inequalities[i];
        var fx = inequality.fn(x);
        if (inequality.type === "<" && y > fx) {
          inside = false;
        } else if (inequality.type === ">" && y < fx) {
          inside = false;
        }
      }
    }

    color = (inside ? "#36c" : "#c43");

    //createPoint(x, y, color);
    setPoint(x,y,color);

    return inside;
  };

  var createPoint = function(x, y, color) {
    var p = {
      pt: board.create('point', [x, y], {name: '', strokeColor:color, fixed: true, size: 0.0001}),
      x: x,
      y: y
    };
    points.push(p);
    return p;
  };

  // It's faster to draw pixels manually to indicate the integration hits and misses
  var setPoint = function(x, y, color) {
    points.push({
      x: coordToPixels(x),
      y: coordToPixels(-y),
      color:color });
  };

  // Given a position in graph coordinate space, convert it to pixel space
  var coordSize = getGraphDimensions().x.max - getGraphDimensions().x.min;
  var graphSize = document.getElementById('HitsAndMisses').width;
  var coordToPixels = function(pos) {
    return (pos - getGraphDimensions().x.min) * graphSize / coordSize
  }

  var drawPixels = function(){
    var i, p, len=points.length;
    hitOrMissContext.clearRect ( 0, 0, graphSize, graphSize );
    hitOrMissContext.moveTo(0,0);
    for(i=0; i<len; i++){
      p = points[i];
      hitOrMissContext.fillStyle = p.color;
      hitOrMissContext.fillRect(p.x - 1, p.y - 1, 2, 2);
    }
    points = [];
  }

  var convertRange = function() {
    pxSize = pxSize || document.getElementById('HitsAndMisses').width()
  }

  //
  // Other methods
  //

  var createInequality = function(input, type) {
    var fn;
    try {
      fn = Function("x", "return " + input);
    } catch (ex) {
      alert("bad function data!");
      return;
    }
    var i = {
      fn: fn,
      curve: board.create('functiongraph', fn),
      type: type
    };
    inequalities.push(i);
    return i;
  };

  var createVertical = function(x, type) {
    if (x === "") return;
    x = Number(x);
    if (type === "<") {
      xlt = x;
    } else {
      xgt = x;
    }
    board.create('line', [[x, 0], [x, 1]]);
  };


  var setBoundingBox = function() {
    var minx = Number($('#minx').val());
    var maxx = Number($('#maxx').val());
    var miny = Number($('#miny').val());
    var maxy = Number($('#maxy').val());

    board.setBoundingBox([minx, maxy, maxx, miny]);
  };

  var graph = function() {
    clearBoard();
    $('.function.lt').each(function(){
      var input = $(this).val();
      if (input === "") return;
      createInequality(input, "<");
    });
    $('.function.gt').each(function(){
      var input = $(this).val();
      if (input === "") return;
      createInequality(input, ">");
    });
    createVertical($('.xgt').val(), ">");
    createVertical($('.xlt').val(), "<");
  };

  var clearBoard = function() {
    JXG.JSXGraph.freeBoard(board);
    board = JXG.JSXGraph.initBoard('box', {axis:true});
    setBoundingBox();
    xgt = null;
    xlt = null;
    inequalities = [];
    $('.integrationResult').text("");
  };

  var run = function() {
    clearBoard();
    graph();
    var result = window.integrate();
    drawPixels();
    $('.integrationResult').text(result);
  };

  //
  // jQuery Bindings
  //

  $(document).on('keyup', '.dimensions', setBoundingBox.bind(this));
  $(document).on('click', 'button.graph', graph.bind(this));
  $(document).on('click', 'button.clear', clearBoard.bind(this));
  $(document).on('click', 'button.run', run.bind(this));
});




