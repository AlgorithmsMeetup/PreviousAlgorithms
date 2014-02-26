$(document).on('ready', function() {
  var board = JXG.JSXGraph.initBoard('box', {boundingbox: [-5, 5, 5, -5], axis:true});
  var points = [];
  var inequalities = [];
  var xgt = null;
  var xlt = null;

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

    color = (inside ? "green" : "red");

    createPoint(x, y, color);

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
    points = [];
    inequalities = [];
    $('.integrationResult').text("");
  };

  var run = function() {
    clearBoard();
    graph();
    var result = window.integrate();
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




