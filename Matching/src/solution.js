/*
  Greetings, algorithmics!  Today, our problem is the "Best Matching Problem".
  
  Imagine n people go to the pound to adopt puppies, and there are (coincidentally) n puppies at the pound.
  Each person makes a list of puppies, ranking them from least to most favorite.
  Similarly, each puppy makes a ranking of the humans.

  The challenge is to pair up puppies and humans so that the maximum amount of satisfaction is achieved.

  This problem is open-ended - the solution I'll present at the end of class is just one possible answer.

  ---

  INPUT: (Imagine we have 3 humans and 3 puppies.)

  {
    humans: {
      "human1": ['puppy2', 'puppy3', 'puppy1'], <-- 
      "human2": ['puppy2', 'puppy1', 'puppy3'], <-- Rankings,
      "human3": ['puppy1', 'puppy3', 'puppy2']  <-- 
    },                                          <--   from
                                                <--   WORST
    puppies: {                                  <--    
      "puppy1": ['human1', 'human2', 'human3'], <--    to
      "puppy2": ['human2', 'human3', 'human1'], <--   BEST
      "puppy3": ['human2', 'human3', 'human1']  <--
    }
  }

  In this situation, human1 likes puppy1 the best, and puppy2 the worst.
  
  OUTPUT:
    [
      {human: "human1", puppy: "puppy1"}, <-- An array of objects,
      {human: "human2", puppy: "puppy3"}, <-- each listing a puppy
      {human: "human3", puppy: "puppy2"}  <-- and a human.
    ]

  ---
  NOTES:
  
    - You can use Object.keys(input.humans) to get a list of all humans (and similar for puppies)
    - You have use of the underscore.js library, which you may find useful.

*/

// This solution pairs humans and puppies without considering their preferences.
// Let's see if you can do better!
window.solve = function(input) {
  var humanPrefs = input.humans;
  var puppyPrefs = input.puppies;
  
  var humans = Object.keys(humanPrefs);
  var puppies = Object.keys(puppyPrefs);
  
  var matches = [];

  for (var i = 0; i < humans.length; i++) {
    matches.push({
      human: humans[i], 
      puppy: puppies[i]
    })
  }

  return matches;
};
