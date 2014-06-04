/*
  Greetings, algorithmics!

  Your task today is to find the minimum path through a grid of numbers, top to bottom,
  where at each row, you are permitted to move straight down, down and left, or down and right.

  This is a famous problem for introducing Dynamic Programming, a technique for solving recursive
  problems more optimally.  When we do DP, we try not to solve the same sub-problem twice, and
  we build solutions from the bottom-up instead of the top-down.

  INPUT:  A two-dimensional grid of size NxN, where N is the `size` variable listed below.
  OUTPUT: A single array, listing the columns that you pass through.  For example, [1, 2, 3..]
          means that in row 0, you are in column 1; in row 1, you are in column 2, etc
          The output should be of length equal to the `size` variable.

  If you finish this problem early, and want a challenge, try to find a Dynamic Programming
  solution to last meetup's making-change problem!  This is a little more challenging...
*/

var size = 100;


var findMinimumPath = function(input) {
	
	var tempsolutions = [];
	for (var i = 0; i < input.length; i++){
		tempsolutions[i] = new Array();
	}

	// loop 2nd to last row through first
	for (var i = input.length - 1 ; i >= 0; i--){
		
		// will need to store the last looped row's
		// "best path" values
		if (i == 0)
			var temparray = [];
		
		for (var j = 0; j < input[i].length; j++){
		
			// get the "best path" value of belowleft, and belowmiddle and belowright
		
			// below left
			if (i == input[i].length - 1)
				// if were already at the bottom row
				var belowColLeft = input[i][j];
			else if (j == 0)
				// left of j 0 doesnt exist
				var belowColLeft = Infinity;
			else
				var belowColLeft = input[i+1][j - 1] + input[i][j];
				
		
			// below middle
			if (i == input[i].length - 1)
				// if were already at the bottom row
				var belowColMiddle = input[i][j];
			else
				var belowColMiddle = input[i+1][j] + input[i][j];
				
			
			// below right
			if (i == input[i].length - 1)
				// if were already at the bottom row
				var belowColRight = input[i][j];
			else if (j == input[i].length - 1)
				// right of j max doesnt exist
				var belowColRight = Infinity;
			else
				var belowColRight =  input[i+1][j+1] + input[i][j];
			
			// pick the lowest value
			var min = Math.min(belowColLeft, belowColMiddle, belowColRight);
			
			// if its any row but the bottom row:
			if (i < input.length - 1){
				
				// take the min == colBelow's path, slice copying it from the tempSolutionsBelow array,
				// and unshift the current column
				// set to the new current columns list
				
				if (min == belowColLeft){
					tempsolutions[j] = tempsolutionsBelow[j-1].slice(0);
					tempsolutions[j].unshift(j);
				
				} else if (min == belowColMiddle){
					tempsolutions[j] = tempsolutionsBelow[j].slice(0);
					tempsolutions[j].unshift(j);
			
				} else {
					tempsolutions[j] = tempsolutionsBelow[j+1].slice(0);
					tempsolutions[j].unshift(j);
				}
				
			// if its the bottom row, all of the belowColXXX will be equal (and nonexistant),
			// so set its path equal to an array containing the value of itself (column)
			} else {
				tempsolutions[j].push(j);
			}
			
			// set grid value to the "best path" value 
			input[i][j] = min;
			
			// last looped row's "best path" values for each column
			if (i == 0)
				temparray.push(min);
		}
		
		// every loop, set the below row to this tempsolutionsBelow container
		var tempsolutionsBelow = tempsolutions.slice(0);
	}

	// take the lowest "best path" value and get its index
	solutionIndex = temparray.indexOf(Math.min.apply(Math, temparray ));
	
	// take that index and get the path list for that column
	solution = tempsolutions[solutionIndex]

	return solution;
}