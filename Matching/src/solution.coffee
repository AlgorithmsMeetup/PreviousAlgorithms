window.solve = (input) ->
  humanPrefs = input.humans
  puppyPrefs = input.puppies

  humans = _.keys(humanPrefs)
  puppies = _.keys(puppyPrefs)

  # Keep track of who has been matched so far.
  matchByHuman = {}
  matchByPuppy = {}

  # To see whether we're done.
  matchedAll = false
  while not matchedAll
    # Assume everyone is matched until shown otherwise.
    matchedAll = true

    # Loop over every human.
    for human in humans
      if not matchByHuman[human]
        # We have an unmatched human, so set matchedAll to false
        matchedAll = false

        # get most favored puppy
        puppy = humanPrefs[human].pop()

        # puppy is not yet matched.
        if not matchByPuppy[puppy]
          matchByPuppy[puppy] = human
          matchByHuman[human] = puppy

        # puppy has been matched already.
        else
          # WHO IS MY RIVAL
          existingMatch = matchByPuppy[puppy]

          # Calculate my rank, and the rank of my rival.
          myRank = puppyPrefs[puppy].indexOf(human)
          existingMatchRank = puppyPrefs[puppy].indexOf(existingMatch)

          # If my rank is greater, replace the pretender
          if myRank > existingMatchRank
            matchByHuman[existingMatch] = null
            matchByHuman[human] = puppy
            matchByPuppy[puppy] = human

  # Make my solution
  solution = []
  for puppy, human of matchByPuppy
    solution.push {human: human, puppy: puppy}

  return solution

# For the optimal solution, see http://www.corelab.ntua.gr/courses/netalg/pres2013/xatzidimitriou.pdf
# But be prepared for a lot of math!
