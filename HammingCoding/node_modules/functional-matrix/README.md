# Functional Matrix

An easy-to-use library for working with two-dimensional arrays and matrices.  Most functional and array methods are implemented here, including `each`, `map`, `reduce`, `zipWith`, `every`, `push`, `pop`, `slice`, and `concat`.  Standard numerical methods, such as `multiply` and `determinant`, are also included, along with some common examples, like the identity and 2d-rotation matrices.

Functional Matrix is fully tested and throws clear error messages to aid in your debugging.

## Usage

### Initializiation
```javascript
  var Matrix = require("functional-matrix");

  // a 2x3 matrix where all elements are "hello".
  var matrix1 = new Matrix(2, 3, "hello");

  // a 3x1 matrix with computed elements.
  var matrix2 = new Matrix(3, 1, function(row, col) {
    return 10*row + 3*col;
  })

  // a matrix from a 2d array.
  var matrix3 = new Matrix([[1, 2], [3, 4]]);

  // A new 2d array from a matrix.
  var arrays = matrix4.to2dArray();
```

### Functional methods

```javascript
  var matrix1 = new Matrix(2, 3, function(i, j) {
    return i + j;
  });
  // 0 1 2
  // 1 2 3

  // Make a new array through `map`.
  var mapped = matrix1.map(function(elem, i, j) {
    return elem * -1;
  });
  //  0 -1 -2
  // -1 -2 -3

  // Reduce all rows into values, creating a 1d array.
  // Initial values can be a single value or an array (1 val for each row).
  var rowReduced = matrix1.reduceRows(function(partial, elem, i, j) {
    return partial + elem
  }, [10, 20]); 
  // [13, 26]
```

### Regular matrix stuff

```javascript
  var matrix = new Matrix(3, 4, Math.random) // 3x4 matrix of random elements

  matrix.set(1, 2, "bananas")
  matrix.get(1, 2); // "bananas"
  matrix.equals(otherMatrix); // boolean
  
  // Numerical methods
  matrix.add(4).add(otherMatrix).times(anotherMatrix).mod(2).determinant()

  // Implementations of standard array methods.
  var slice = matrix.slice(0, 0, 2, 2) // args: startRow, startCol, endRow, endCol
  var newColCount = matrix.pushCol([5, 6, 7]); // modifies matrix in-place
  var row = matrix.popRow(); 
  var larger = matrix.concatVertical(otherMatrix); // sizes must match
  var idx = matrix.indexOf(1) // {row: 0, col: 0}
  
```

## Method List

### Class methods
- new Matrix(height, width, value)
- new Matrix(height, width, fillFunction(row, col))
- new Matrix(arrayOfArrays)
- .identity(size)
- .rotation(radians) - *2d rotation matrix for given angle*
- .rotationRadians(radians) - *alias of `rotation`*
- .rotationDegrees(degrees)
- .vector(array) - *a matrix with one row*
- .vectorHorizontal(array) - *alias of `rector`*
- .vectorVertical(array) - *like vector, but transposed*

### Basics
- .to2dArray()
- .toString()
- .copy()
- .clone() - *alias of `copy`*
- .equals(matrix)
- .equalsRow(rowIdx, array) - *tests if row is equal to given array*
- .equalsRow(rowIdx, matrix) - *tests if row is equal to row in other matrix*
- .equalsCol(colIdx, array)
- .equalsCol(colIdx, matrix)
- .size() - *returns an object {rows: x, cols: y};*
- .rows() - *row count*
- .cols() - *col count*
- .withinBounds(rowIdx, colIdx) - *boolean*
- .get(rowIdx, colIdx)
- .getRow(rowIdx) - *returns a copy of the indicated row*
- .getCol(colIdx)
- .set(rowIdx, colIdx, newValue)
- .setRow(rowIdx, newValue) - *all entries are set to newValue*
- .setRow(rowIdx, arrayOfNewValues) - *entries set to values in array*
- .setRow(rowIdx, function(colIdx)) - *entries are calculated by given function*
- .setCol(colIdx, newValue)
- .setCol(colIdx, arrayOfNewValues)
- .setCol(colIdx, function(rowIdx))
- .fill(fillFunction(rowIdx, colIdx)) - *sets all values*
- .clear() - *sets all values to undefined*

### Functional Methods
All functional methods by default iterate from left to right, top to bottom.  Vertical versions are also provided, though.  All methods are NOT in-place and return copies.

- .map(iterator(value, rowIdx, colIdx, matrix))
- .reduce(iterator(acc, value, rowIdx, colIdx, matrix))
- .reduceHorizontal - *alias of `reduce`*
- .reduceVertical
- .reduceRows(iterator(acc, value, row), initial) - *passes each row to iterator, returns an array of results*
- .reduceCols(iterator(acc, value, col), initial) - *initial can be a value or an array of values, one per column*
- .each(iterator(value, rowIdx, colIdx, matrix))
- .eachHorizontal - *alias of `each`*
- .eachVertical
- .eachRow(iterator(row, rowIdx, matrix)) - *passes each row array to the iterator*
- .eachCol(iterator(col, colIdx, matrix))
- .every(iterator(value, rowIdx, colIdx))
- .some(iterator(value, rowIdx, colIdx))
- .zipWith(otherMatrix, iterator(thisElem, otherElem, i, j, thisMatrix, otherMatrix)) - *like `map` but with two sources of the same size*
- .pluck(property) - *maps to named property of each element*
- .invoke(method) - *maps to result of invoking named method of each element*
- .sample() - *returns random element*
- .sample(n) - *returns array of n random elements*
- .shuffle() - *shuffles elements but maintains size*

__coming soon__
- Support for currying and partial application!
- Right/bottom versions of each/reduce

### Numerical methods
All methods are NOT in-place and return copies.

- .plus(number)
- .plus(matrix)
- .add - *alias of `plus`*
- .minus(number)
- .minus(matrix)
- .subtract - *alias of `minus`*
- .times(number)
- .times(matrix)
- .multiply - *alias of `times`*
- .mod(number)
- .round(digit) - *rounds all values to the given precision*
- .determinant()
- .rowMultiply(fromIdx, toIdx, multiple) - *add multiple of fromRow to toRow*

__coming soon__
- .inverse()
- .upperTriangular()
- .solveSystem(values)
- .eigenvalues()


### Transforming methods
These work the same as the familiar array methods, except they take/return arrays. Push/pop/shift/unshift are in-place, to match arrays.  All other methods return new matrices.

- .slice(startRow, startCol, endRow, endCol) - *negative indices behave like array slice*
- .submatrix() - *alias of `slice`*
- .pushRow(newRow) - *returns new row count*
- .pushCol(newCol)
- .unshiftRow(newRow)
- .unshiftCol(newCol)
- .popRow()
- .popCol()
- .shiftRow()
- .shiftCol()
- .concat(matrix)
- .concatHorizontal - *alias of `concat`*
- .concatVertical(matrix)
- .minor(rowIdx, colIdx) - *the matrix after removing the given row and column*
- .transpose()
- .swapRows(rowIdx1, rowIdx2)
- .swapCols(colIdx1, colIdx2)
- .rotateCW()
- .rotateCCW()
- .flipHorizontal()
- .flipVertical()

### Query methods

- .contains(elem)
- .indexOf(elem) - *finds the first index; returns {row: x, col: y} or null*
- .indexesOf(elem) - *returns array of all matches*
- .count(elem)
- .replace(elem, newElem) - *returns copy*

__coming soon__
- Support for functions and regexes in .replace





