var clone = function(obj){
  var newobj;

  if(Array.isArray(obj)){
    newobj = [];
    for(var i = 0; i < obj.length; i++){
      newobj.push(obj[i]);
    }
  } else {
    var key;
    newobj = {};
    for(key in obj){
      newobj[key] = obj[key];
    }
  }
  
  return newobj;
}
