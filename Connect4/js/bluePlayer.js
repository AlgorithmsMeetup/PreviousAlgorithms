players.blue = {

  move: function(cb) {
    setTimeout(function() {
      var rand = Math.floor(Math.random()*16);
      if (rand === 0) return cb (0)
      if (rand === 1) return cb (1)
      if (rand === 2) return cb (1)
      if (rand === 3) return cb (2)
      if (rand === 4) return cb (2)
      if (rand === 5) return cb (2)
      if (rand === 6) return cb (3)
      if (rand === 7) return cb (3)
      if (rand === 8) return cb (3)
      if (rand === 9) return cb (3)
      if (rand === 10) return cb (4)
      if (rand === 11) return cb (4)
      if (rand === 12) return cb (4)
      if (rand === 13) return cb (5)
      if (rand === 14) return cb (5)
      if (rand === 15) return cb (6)

    }, Math.random()*1000);
  }

}