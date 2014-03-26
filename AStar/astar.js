/*
  Hello, algorithmicists!  Today we're going to implement the A* search algorithm.

  The fundamental unit of this algorithm is the `node`.  Nodes represent spaces on the
  board, and have the following properties and methods.

    Properties:
      f: // estimated path length through this node.
      g: // shortest path found (so far) from start to this node.

    Methods:
      indexIn(set):    // returns the index of the node in the set, or -1 if not present.
      isGoal():        // returns whether the node is the goal.
      neighbors():     // returns a list of nodes adjacent to the current one.
      calcHeuristic(): // returns the heuristic distance from this node to the goal.
      visit():         // tells the visualizer that you've visited the current node. (good for debugging)

  You should also note that we've given you the first two lines, defining the closed
  and open sets.  The closed set is a list of nodes that you've visited already, and
  the open set is a list of nodes "on the boundary" - that is, you've visited one of
  their neighbors, but you haven't yet processed them.  You don't have to mess with
  the sets directly - you can also use Node.indexIn(set).

  Finally, we've done a little magic with the "neighbors" function, which will allow
  the visualizer to retrace your steps and draw the path.  Don't worry about this part!

  Just be sure to return the goal node once you've found it.

 */

//trampoline - we will use this to recurse
function trampoline(n) {
	while (n && n instanceof Function) {
		n = n.apply(n.context, n.args);
	}
	return n;
}

window.solve = function(startNode) {
	var open = [ startNode ];
	var closed = [];
	startNode.g = 0;
	startNode.f = startNode.g + startNode.calcHeuristic();
	var current = startNode;
	// recursively find path
	// this is the actual work...
	function findNextStepInPath(current, open, closed) {

		// look at open nodes for shortest path
		var shortestIdx = 0;
		for ( var i = 0; i < open.length; i++) {
			if (open[i].f < open[shortestIdx].f) {
				shortestIdx = i;
			}
		}

		// remove shortest from open set, add to closed set
		current = open.splice(shortestIdx, 1).pop();
		closed.push(current);

		// tell visualizer we have visited current node
		current.visit();

		// are we done?
		if (current.isGoal()) {
			return current;
		}

		// assign values to neighbors
		var neighbors = current.neighbors();
		for ( var i = 0; i < neighbors.length; i++) {
			var nextNode = neighbors[i];
			//only add process if we haven't looked at nextnode yet...
			if (nextNode.indexIn(closed) === -1 && nextNode.indexIn(open) === -1) {
				nextNode.g = current.g + 1;
				nextNode.f = nextNode.g + nextNode.calcHeuristic();
				open.push(nextNode);
			}
		}
		return findNextStepInPath.bind(null, current, open, closed);
	}
	return trampoline(findNextStepInPath.bind(null, current, open, closed));

}
