'use strict';

/*
  Helpers
*/

var isNumber = function(item) {
  return Object.prototype.toString.call(item) === "[object Number]";
};
var isString = function(item) {
  return Object.prototype.toString.call(item) === "[object String]";
};
var isFunction = function(item) {
  return Object.prototype.toString.call(item) === "[object Function]";
};
var isArray = Array.isArray || function(item) {
  return Object.prototype.toString.call(item) === "[object Array]";
};

/*
  Constructors and such
*/

var Matrix = function(rows, cols, fillFunction) {
  // Construction from a 2D array.
  if (isArray(rows)) {
    var data = rows;
    if (!data.every(isArray)) {
      throw new Error("A matrix cannot be constructed from a one-dimensional array");
    }
    
    var rowCount = data.length;
    var colCount = data.reduce(function(max, row) { return row.length > max ? row.length : max; }, 0);
    
    this._storage = data.slice().map(function(r) {
      var copy = r.slice();
      while (copy.length < colCount) {
        copy.push(undefined);
      }
      return copy; 
    });
    
    this._rows = rowCount;
    this._cols = colCount;
  
  // Construction from size and a fill function.
  } else {
    this._rows = rows;
    this._cols = cols;
    this.fill(fillFunction);
  }
};

Matrix.prototype.toString = function() {
  var output = "";
  for (var i = 0; i < this._rows; i++) {
    output += this._storage[i].join(" ") + "\n";
  }
  return output;
};

Matrix.prototype.to2dArray = function() {
  return this._storage.slice().map(function(r) {return r.slice(); });
};

Matrix.prototype.copy = Matrix.prototype.clone = function() {
  return new Matrix(this._rows, this._cols, this.get.bind(this));
};

Matrix.prototype.equals = function(that) {
  if (!(that instanceof Matrix)) {
    throw new Error("Equals must compare a matrix to a matrix");
  }
  if (this._rows !== that._rows || this._cols !== that._cols) {
    return false;
  }
  for (var i = 0; i < this._rows; i++) {
    for (var j = 0; j < this._cols; j++) {
      if (this.get(i, j) !== that.get(i, j)) {
        return false;
      }
    }
  }
  return true;
};

/*
  Basic Methods
*/

Matrix.prototype.set = function(row, col, val) {
  if (row < 0 || row >= this._rows) {
    throw new Error(["Row index", row, "is out of bounds"].join(" "));
  }
  if (col < 0 || col >= this._cols) {
    throw new Error(["Col index", col, "is out of bounds"].join(" "));
  }
  var oldVal = this.get(row, col);
  this._storage[row][col] = val;
  return oldVal;
};

Matrix.prototype.fill = function(fillFunction) {
  // Allow initialization by function, or by a single value, or with only undefined.
  if (typeof fillFunction === "undefined") {
    fillFunction = function() { return undefined; };
  }
  if (!isFunction(fillFunction)) {
    var fillVal = fillFunction;
    fillFunction = function() { return fillVal; };
  }

  this._storage = [];
  for (var i = 0; i < this._rows; i++) {
    var newRow = [];
    for (var j = 0; j < this._cols; j++) {
      var val = fillFunction(i, j, this);
      newRow.push(val);
    }
    this._storage.push(newRow);
  }

  return this;
};

Matrix.prototype.clear = function() {
  return this.fill();
};

Matrix.prototype.size = function() {
  return {
    rows: this._rows,
    cols: this._cols
  };
};

Matrix.prototype.withinBounds = function(row, col) {
  return row >= 0 && row < this._rows && col >= 0 && col < this._cols;
};

Matrix.prototype.rows = function() {
  return this._rows;
};

Matrix.prototype.cols = function() {
  return this._cols;
};

Matrix.prototype.get = function(row, col) {
  return this._storage[row] ? this._storage[row][col] : undefined;
};

Matrix.prototype.getRow = function(row) {
  return this._storage[row] ? this._storage[row].slice() : undefined;
};

Matrix.prototype.getCol = function(col) {
  var output = [];
  for (var i = 0; i < this._rows; i++) {
    output.push(this._storage[i][col]);
  }
  return output;
};



/*
  Functional Programming Methods
*/

Matrix.prototype.each = Matrix.prototype.eachHorizontal = function(iterator) {
  for (var i = 0; i < this._rows; i++) {
    for (var j = 0; j < this._cols; j++) {
      iterator(this.get(i, j), i, j, this);
    }
  }
  return this;
};

Matrix.prototype.eachVertical = function(iterator) {
  for (var j = 0; j < this._cols; j++) {
    for (var i = 0; i < this._rows; i++) {
      iterator(this.get(i, j), i, j, this);
    }
  }
  return this;
};

Matrix.prototype.eachRow = function(iterator) {
  for (var i = 0; i < this._rows; i++) {
    iterator(this.getRow(i), i, this);
  }
  return this;
};

Matrix.prototype.eachCol = function(iterator) {
  for (var i = 0; i < this._cols; i++) {
    iterator(this.getCol(i), i, this);
  }
  return this;
};

Matrix.prototype.map = function(iterator) {
  var that = this;
  return new Matrix(this._rows, this._cols, function(i, j) {
    return iterator(that.get(i, j), i, j, that);
  });
};

Matrix.prototype.reduce = Matrix.prototype.reduceHorizontal = function(iterator, val) {
  for (var i = 0; i < this._rows; i++) {
    for (var j = 0; j < this._cols; j++) {
      val = iterator(val, this.get(i, j), i, j, this);
    }
  }
  return val;
};

Matrix.prototype.reduceVertical = function(iterator, val) {
  for (var j = 0; j < this._cols; j++) {
    for (var i = 0; i < this._rows; i++) {
      val = iterator(val, this.get(i, j), i, j, this);
    }
  }
  return val;
};

Matrix.prototype.reduceRows = function(iterator, val) {
  var output = [];
  for (var i = 0; i < this._rows; i++) {
    var initial = isArray(val) ? val[i] : val;
    output.push(this.getRow(i).reduce(iterator, initial));
  }
  return output;
};

Matrix.prototype.reduceCols = function(iterator, val) {
  var output = [];
  for (var i = 0; i < this._cols; i++) {
    var initial = isArray(val) ? val[i] : val;
    output.push(this.getCol(i).reduce(iterator, initial));
  }
  return output;
};

/*
  Size-changing methods
*/

Matrix.prototype.pushRow = function(newRow) {
  if (!isArray(newRow)) {
    throw new Error("Cannot push a non-array onto a matrix");
  }
  if (newRow.length !== this._cols) {
    throw new Error(["Cannot push a row of width", newRow.length, "onto a matrix of width", this._cols].join(" "));
  }
  this._storage.push(newRow.slice());
  this._rows++;
  return this;
};

Matrix.prototype.pushCol = function(newCol) {
  if (!isArray(newCol)) {
    throw new Error("Cannot push a non-array onto a matrix");
  }
  if (newCol.length !== this._rows) {
    throw new Error(["Cannot push a col of height", newCol.length, "onto a matrix of height", this._rows].join(" "));
  }
  for (var i = 0; i < this._rows; i++) {
    this._storage[i].push(newCol[i]);
  }
  this._cols++;
  return this;
};

Matrix.prototype.unshiftRow = function(newRow) {
  if (!isArray(newRow)) {
    throw new Error("Cannot unshift a non-array onto a matrix");
  }
  if (newRow.length !== this._cols) {
    throw new Error(["Cannot unshift a row of width", newRow.length, "onto a matrix of width", this._cols].join(" "));
  }
  this._storage.unshift(newRow.slice());
  this._rows++;
  return this;
};

Matrix.prototype.unshiftCol = function(newCol) {
  if (!isArray(newCol)) {
    throw new Error("Cannot unshift a non-array onto a matrix");
  }
  if (newCol.length !== this._rows) {
    throw new Error(["Cannot unshift a col of height", newCol.length, "onto a matrix of height", this._rows].join(" "));
  }
  for (var i = 0; i < this._rows; i++) {
    this._storage[i].unshift(newCol[i]);
  }
  this._cols++;
  return this;
};

Matrix.prototype.popRow = function() {
  this._rows--;
  return this._storage.pop();
};

Matrix.prototype.popCol = function() {
  var output = [];
  for (var i = 0; i < this._rows; i++) {
    output.push(this._storage[i].pop());
  }
  this._cols--;
  return output;
};

Matrix.prototype.shiftRow = function() {
  this._rows--;
  return this._storage.shift();
};

Matrix.prototype.shiftCol = function() {
  var output = [];
  for (var i = 0; i < this._rows; i++) {
    output.push(this._storage[i].shift());
  }
  this._cols--;
  return output;
};

Matrix.prototype.concat = Matrix.prototype.concatHorizontal = function(that) {
  if (!(that instanceof Matrix)) {
    throw new Error("Cannot concat a matrix to a non-matrix");
  }
  if (this._rows !== that._rows) {
    throw new Error(["Cannot concat a matrix with", this._rows, "rows to a matrix with", that._rows, "rows"].join(" "));
  }
  var newStorage = [];
  for (var j = 0; j < this._rows; j++) {
    newStorage.push(this._storage[j].concat(that._storage[j]));
  }
  return new Matrix(newStorage);
};

Matrix.prototype.concatVertical = function(that) {
  if (!(that instanceof Matrix)) {
    throw new Error("Cannot concatVertical a matrix to a non-matrix");
  }
  if (this._cols !== that._cols) {
    throw new Error(["Cannot concatVertical a matrix with", this._cols, "cols to a matrix with", that._cols, "cols"].join(" "));
  }
  var newStorage = this._storage.concat(that._storage);
  return new Matrix(newStorage);
};

Matrix.prototype.minor = function(row, col) {
  if (row < 0 || row >= this._rows) {
    throw new Error(["Row index", row, "is out of bounds"].join(" "));
  }
  if (col < 0 || col >= this._cols) {
    throw new Error(["Col index", col, "is out of bounds"].join(" "));
  }
  var newStorage = [];
  for (var i = 0; i < this._rows; i++) {
    if (i === row) continue;
    var newRow = [];
    for (var j = 0; j < this._cols; j++) {
      if (j === col) continue;
      newRow.push(this.get(i, j));
    }
    newStorage.push(newRow);
  }
  return new Matrix(newStorage);
};

Matrix.prototype.transpose = function() {
  var that = this;
  return new Matrix(this._cols, this._rows, function(i, j) {
    return that.get(j, i);
  });
};

/*
  Query methods
*/

Matrix.prototype.contains = function(elem) {
  for (var i = 0; i < this._rows; i++) {
    for (var j = 0; j < this._cols; j++) {
      if (this.get(i, j) === elem) {
        return true;
      }
    }
  }
  return false;
};

Matrix.prototype.indexOf = function(elem) {
  for (var i = 0; i < this._rows; i++) {
    for (var j = 0; j < this._cols; j++) {
      if (this.get(i, j) === elem) {
        return {row: i, col: j};
      }
    }
  }
  return null;
};

Matrix.prototype.indexesOf = function(elem) {
  var output = [];
  for (var i = 0; i < this._rows; i++) {
    for (var j = 0; j < this._cols; j++) {
      if (this.get(i, j) === elem) {
        output.push({row: i, col: j});
      }
    }
  }
  return output;
};

Matrix.prototype.count = function(elem) {
  var count = 0;
  for (var i = 0; i < this._rows; i++) {
    for (var j = 0; j < this._cols; j++) {
      if (this.get(i, j) === elem) {
        count++;
      }
    }
  }
  return count;
};

Matrix.prototype.replace = function(target, replacement) {
  return this.map(function(elem) { return (elem === target) ? replacement : elem;});
};

/*
  Numerical Methods
*/

Matrix.prototype.add = Matrix.prototype.plus = function(that) {
  // Adding two matrices.
  if (that instanceof Matrix) {
    if (this._rows !== that._rows) {
      throw new Error(["Cannot add a matrix with", this._rows, "rows to a matrix with", that._rows, "rows"].join(" "));
    }
    if (this._cols !== that._cols) {
      throw new Error(["Cannot add a matrix with", this._cols, "cols to a matrix with", that._cols, "rows"].join(" "));
    }

    return this.map(function(elem, i, j) { return elem + that.get(i, j); });

  // Adding a constant value to a matrix.
  } else if (isNumber(that) || isString(that)) {
    return this.map(function(elem) { return elem + that; });

  } else {
    throw new Error("Cannot add a matrix to " + that);
  }
};

Matrix.prototype.times = Matrix.prototype.multiply = function(that) {
  // Matrix multiplication.
  if (that instanceof Matrix) {
    if (this._cols !== that._rows) {
      throw new Error(["Cannot multiply a matrix of", this._cols, "cols with a matrix of", that._rows, "rows"].join(" "));
    }

    return new Matrix(this._rows, that._cols, (function(i, j) {
      var row = this.getRow(i);
      var col = that.getCol(j);
      return row.reduce(function(sum, elem, idx) {
        return sum + elem*col[idx];
      }, 0);
    }).bind(this));

  // Scalar multiplication.
  } else if (isNumber(that)) {
    return this.map(function(elem) { return elem * that; });

  } else {
    throw new Error("Cannot multiply a matrix with " + that);
  }
};

Matrix.prototype.subtract = Matrix.prototype.minus = function(that) {
  // Subtracting two matrices.
  if (that instanceof Matrix) {
    if (this._rows !== that._rows) {
      throw new Error(["Cannot subtract a matrix with", that._rows, "rows from a matrix with", this._rows, "rows"].join(" "));
    }
    if (this._cols !== that._cols) {
      throw new Error(["Cannot subtract a matrix with", that._cols, "cols from a matrix with", this._cols, "rows"].join(" "));
    }
    return this.map(function(elem, i, j) { return elem - that.get(i, j); });

  // Subtracting a constant value from a matrix.
  } else if (isNumber(that)) {
    return this.map(function(elem) { return elem - that; });

  } else {
    throw new Error(["Cannot subtract", String(that), "from a matrix"].join(" "));
  }
};

Matrix.prototype.mod = function(modulus) {
  if (!isNumber(modulus)) {
    throw new Error("Cannot take a matrix modulo a non-number");
  }
  return this.map(function(elem) { return elem % modulus; });
};

Matrix.identity = function(size) {
  if (size > 0 && size < Infinity) {
    return new Matrix(size, size, function(i, j) {
      return i === j ? 1 : 0;
    });
  } else {
    throw new Error("Invalid size for identity matrix");
  }
};

Matrix.prototype.determinant = function() {
  var size = this._rows;
  if (size !== this._cols) {
    throw new Error("A matrix must be square to have a determinant");
  }
  if (size === 1) {
    return this.get(0, 0);
  } else if (size === 0) {
    return 1;
  } else {
    var sum = 0;
    for (var i = 0, parity = 1; i < size; i++, parity *= -1) {
      var coefficient = this.get(0, i);
      sum += coefficient ? parity*coefficient*this.minor(0, i).determinant() : 0;
    }
    return sum;
  }
};

Matrix.prototype.rowMultiply = function(fromIdx, toIdx, multiple) {
  var fromRow = this.getRow(fromIdx);
  var that = this;
  return new Matrix(this._rows, this._cols, function(i, j) {
    if (i !== toIdx) {
      return that.get(i, j);
    } else {
      return that.get(i, j) + that.get(toIdx, j);
    }
  });
};

Matrix.prototype.inverse = function() {
  throw new Error("Not yet implemented");
  // var size = this._rows;
  // if (size !== this._cols) {
  //   throw new Error("A matrix must be square to have an inverse.");
  // }
};

Matrix.prototype.upperTriangular = function() {
  throw new Error("Not yet implemented");
};

Matrix.prototype.solveSystem = function(values) {
  throw new Error("Not yet implemented");
};



module.exports = Matrix;