players.blue = {

  move: function(cb) {
    setTimeout(function() {
      var col = Math.floor(Math.random()*7);
      return cb(col);
    }, Math.random()*1000);
  }

}