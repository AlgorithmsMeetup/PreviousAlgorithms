window.solve = function(input) {
  var humanPrefs = input.humans;
  var puppyPrefs = input.puppies;
  var humans = _.keys(humanPrefs);
  var puppies = _.keys(puppyPrefs);
  var matchByHuman = {};
  var matchByPuppy = {};
  var matchedAll = false;
  while (!matchedAll) {
    matchedAll = true;
    
    for (var i = 0, len = humans.length; i < len; i++) {
      human = humans[i];
      
      if (!matchByHuman[human]) {
        matchedAll = false;
        var puppy = humanPrefs[human].pop();
        
        if (!matchByPuppy[puppy]) {
          matchByPuppy[puppy] = human;
          matchByHuman[human] = puppy;
        } else {
          var existingMatch = matchByPuppy[puppy];
          
          var myRank = puppyPrefs[puppy].indexOf(human);
          var existingMatchRank = puppyPrefs[puppy].indexOf(existingMatch);
          
          if (myRank > existingMatchRank) {
            matchByHuman[existingMatch] = null;
            matchByHuman[human] = puppy;
            matchByPuppy[puppy] = human;
          }
        }
      }
    }
  }

  solution = [];
  for (puppy in matchByPuppy) {
    human = matchByPuppy[puppy];
    solution.push({
      human: human,
      puppy: puppy
    });
  }
  
  return solution;
};