# # Random solution - match each human with a random puppy.  Ignores preferences.
# window.solve = (input) ->
#   humanPrefs = input.humans
#   puppyPrefs = input.puppies

#   humans = _.chain(humanPrefs).keys().shuffle().value()
#   puppies = _.chain(puppyPrefs).keys().shuffle().value()

#   return _.chain(humans).zip(puppies).map((pair) -> {human: pair[0], puppy: pair[1]}).value()


window.solve = (input) ->
  humanPrefs = input.humans
  puppyPrefs = input.puppies

  humans = _.keys(humanPrefs)
  puppies = _.keys(puppyPrefs)

  matchByHuman = {}
  matchByPuppy = {}

  matchedAll = false
  roundNum = 0
  while not matchedAll
    matchedAll = true
    for human in humans
      if not matchByHuman[human]
        matchedAll = false
        # get most favored puppy
        puppy = humanPrefs[human].pop()

        # puppy is not yet matched.
        if not matchByPuppy[puppy]
          matchByPuppy[puppy] = human
          matchByHuman[human] = puppy

        # already matched this puppy
        else
          existingMatch = matchByPuppy[puppy]

          myRank = puppyPrefs[puppy].indexOf(human)
          existingMatchRank = puppyPrefs[puppy].indexOf(existingMatch)

          if myRank >= existingMatchRank
            matchByHuman[existingMatch] = null
            matchByHuman[human] = puppy
            matchByPuppy[puppy] = human

  solution = []
  for puppy, human of matchByPuppy
    solution.push {human: human, puppy: puppy}

  return solution



