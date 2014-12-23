# FunctionalMatrix

## Usage

### Initializiation
```javascript
  var Matrix = require("functional-matrix");

  // a 2x3 matrix where all elements are "hello".
  var matrix1 = new Matrix(2, 3, "hello");

  // a 3x1 matrix with random elements.
  var matrix2 = new Matrix(3, 1, function(i, j) {
    return Math.random();
  })

  // a matrix from a 2d array.
  var matrix4 = new Matrix([[1, 2], [3, 4]]);

  // the 4x4 identify matrix.
  var matrix3 = Matrix.identity(4)

  // A new 2d array from the matrix.
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
  var matrix = Matrix.identity(3);

  matrix.set(1, 2, "bananas")
  matrix.get(1, 2); // "bananas"
  matrix.equals(otherMatrix); // boolean
  
  matrix.add(4).add(otherMatrix).times(anotherMatrix).mod(2).determinant()

  matrix.transpose() // like most methods, returns a copy.
  matrix.pushRow([1, 2, 3]).pushCol([4, 5, 6]).shiftRow() // except these, for parity with standard array methods.
```

## Method List

### Class methods
- new Matrix(height, width, value)
- new Matrix(height, width, fillFunction(row, col))
- new Matrix(arrayOfArrays)
- Identity(size)

### Basics
- .to2dArray()
- .toString()
- .equals(matrix)
- .copy()
- .set(rowIdx, colIdx, newValue)
- .fill(fillFunction(rowIdx, colIdx))
- .clear() - *sets all values to undefined*
- .size() - *returns an object {rows: x, cols: y};*
- .withinBounds(rowIdx, colIdx)
- .rows() - *row count*
- .cols() - *col count*
- .get(rowIdx, colIdx)
- .getRow(rowIdx)
- .getCol(colIdx)

### Functional Methods
All functional methods by default iterate from left to right, top to bottom.  Vertical versions are also provided, though.

- .each(iterator(val, rowIdx, colIdx, matrix))
- .eachHorizontal - *alias of `each`*
- .eachVertical
- .eachRow(iterator(row, rowIdx, matrix)) - *passes each row array to the iterator*
- .eachCol(iterator(col, colIdx, matrix))
- .map(iterator(val, rowIdx, colIdx, matrix))
- .reduce(iterator(acc, val, rowIdx, colIdx, matrix))
- .reduceHorizontal - *alias of `reduce`*
- .reduceVertical
- .reduceRows(iterator(acc, val, row), initial) - *collapses each row to turn matrix into 1d array*
- .reduceCols(iterator(acc, val, col), initial)

__coming soon__
- Support for currying and partial application!

### Numerical methods

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
- .determinant()
- .rowMultiply(fromIdx, toIdx, multiple)

__coming soon__
- .inverse()
- .upperTriangular()
- .solveSystem(values)
- .eigenvalues()


### Size-changing methods
These work the same as the familiar array methods, except they take/return arrays. Push/pop/shift/unshift are in-place.  Concat/transpose/minor return new matrices.

- .pushRow(newRow)
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
- .minor(row, col) - *the (row, col) minor of the matrix*
- .transpose()

### Query methods

- .contains(elem)
- .indexOf(elem) - *finds the first index; returns {row: x, col: y} or null*
- .indexesOf(elem) - *returns array of all matches*
- .count(elem)
- .replace(elem, newElem) - *returns copy*





