// Write your code here

// Write your code here
Tree.prototype.BFSelect = function(fn){
	var out = [];
	var depth=0;
	bfSearch([this], depth, out, fn);
	return out;
};


function bfSearch(trees, depth, out, fn){
	var nextRow = [];
	for( var i= 0; i< trees.length; i++){
		var nextTree=trees[i];
		if(fn(nextTree.value, depth)){
			out.push(nextTree.value);
		}
		//NOTE: concat does not mute the target array, instead it produces a new one
		nextRow = nextRow.concat(nextTree.children);
	}
	if(nextRow.length){
		bfSearch(nextRow, depth+1, out, fn);
	}
}
