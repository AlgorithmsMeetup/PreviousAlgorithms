# # Random solution - match each human with a random puppy.  Ignores preferences.
window.solve = (input) ->
  humanPrefs = input.humans
  puppyPrefs = input.puppies

  humans = _.chain(humanPrefs).keys().shuffle().value()
  puppies = _.chain(puppyPrefs).keys().shuffle().value()

  return _.chain(humans).zip(puppies).map((pair) -> {human: pair[0], puppy: pair[1]}).value()


