// Write your code here
Tree.prototype.DFSelect = function(fn){
	out = [];
	depth=0;
	dfSearch(this, depth, out, fn);
	return out;
};


var dfSearch = function(tree, depth, out, fn){
	if(fn(tree.value, depth)){
		out.push(tree.value);
	}
	for(var i=0; i< tree.children.length; i++){
		dfSearch(tree.children[i], depth + 1, out, fn);
	};
};