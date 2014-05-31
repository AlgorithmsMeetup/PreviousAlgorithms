(function() {

  var randInt = function() {
    return Math.floor(Math.random()*90) + 10;
  };

  var clone = function(input) {
    return JSON.parse(JSON.stringify(input));
  };

  var calcInputTotal = function(solution, matrix) {
    if (!solution) {
      return "Error in calculation";
    }
    var current = solution[0];
    for (var i = 1; i < solution.length; i++) {
      var next = solution[i];
      if (Math.abs(current - next) > 1) {
        return "Illegal path";
      }
      current = next;
    }
    var sum = 0;
    for(var i = 0; i < solution.length; i++) {
      sum += matrix[i][solution[i]];
    }
    return sum;
  };

  var genMatrix = function() {
    var matrix = [];
    for (var row = 0; row < size; row++) {
      var partial = [];
      for (var col = 0; col < size; col++) {
        partial.push(randInt());
      }
      matrix.push(partial);
    }
    return matrix;
  };

  var render = function(input, mySolution, theirSolution) {
    var matrix = $('.matrix');
    matrix.html('');
    for (var row = 0; row < size; row++) {
      var tRow = $("<div></div>");
      for (var col = 0; col < size; col++) {
        var cell = $("<div class='cell'></div>");
        cell.text(input[row][col]);
        if (mySolution && mySolution[row] === col) {
          cell.addClass("mySolution");
        }
        if (theirSolution && theirSolution[row] === col) {
          cell.addClass("theirSolution");
        }
        tRow.append(cell);
      }
      matrix.append(tRow);
    }
    var myTotal = calcInputTotal(mySolution, input);
    var theirTotal = calcInputTotal(theirSolution, input);

    if (myTotal !== theirTotal) {
      $('.yours').text("Your solution: " + theirTotal);
      $('.yours').removeClass("correct");
      $('.optimal').text("Optimal solution: " + myTotal);
      $('.optimal').removeClass("correct");
    } else {
      $('.yours').text("Your solution: " + theirTotal);
      $('.yours').addClass("correct");
      $('.optimal').text("You got it right!");
      $('.optimal').addClass("correct");
    }

    var windowWidth = $(window).width() * 0.9;
    var style = ".cell {width: " + Math.min(windowWidth/size, 40) + "px; font-size: " + Math.min(windowWidth*2/size/3, 20) + "px;}";
    $("style").html(style);
  };

  var solve = function(input) {
    for (var y = size - 2; y >= 0; y--) {
      for (var x = 0; x < size; x++) {
        var p = input[y + 1];
        var j = p[x - 1] || Infinity;
        var k = p[x];
        var l = p[x + 1] || Infinity;

        input[y][x] += Math.min(j, k, l);
      }
    }

    var b = [];
    var x = 0;
    for (var i = 1; i < size; i++) {
      if (input[0][i] < input[0][x]) {
        x = i;
      }
    }
    b.push(x);
    for (var y = 1; y < size; y++) {
      var c = input[y];
      var j = c[x - 1] || Infinity;
      var k = c[x];
      var l = c[x + 1] || Infinity;
      var min = Math.min(j, k, l);
      if (min == j) {
        x--;
      } else if (min == l) {
        x++;
      }
      b.push(x);
    }
    return b;
  };

  var run = function() {
    var input = genMatrix();
    var theirSolution;
    try {
      theirSolution = findMinimumPath(clone(input));
    } catch (e) {
      theirSolution = null;
    }
    var mySolution = solve(clone(input));
    render(input, mySolution, theirSolution);
  };

  $('.reset').click(run);

  run();
})();
