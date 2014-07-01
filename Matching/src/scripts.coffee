generatePrefs = (size) ->
  humanNames = [
    "Tadd",
    "Sandra",
    "Edward",
    "Colleen",
    "Colin",
    "Bethany",
    "Gilford",
    "Ming",
    "Fredrick",
    "Megan"
  ]

  puppyNames = [
    "Buster",
    "Snuggles",
    "Ike",
    "Bernie",
    "Breakfast",
    "Napoleon",
    "Rex",
    "Louie",
    "Sprinkles",
    "Jess"
  ]

  while humanNames.length < size
    humanNames.push "Human#{humanNames.length+1}"
    puppyNames.push "Puppy#{puppyNames.length+1}"

  humanNames = _(humanNames).shuffle().slice(0, size)
  puppyNames = _(puppyNames).shuffle().slice(0, size)

  prefs =
    puppies: {}
    humans: {}

  for humanName in humanNames
    prefs.humans[humanName] = _(puppyNames).shuffle()
  for puppyName in puppyNames
    prefs.puppies[puppyName] = _(humanNames).shuffle()

  return prefs

evalSolution = (prefs, solution, size) ->
  unless solution.length == size
    console.error "Your solution: ", solution
    console.error "Required size: ", size
    throw new Error "The given solution is not the required size"

  for pair in solution
    unless pair.human? and pair.puppy? and _.isString(pair.human) and _.isString(pair.puppy)
      console.error "Incorrect pair format: ", pair
      console.error "Should look like: {human: number, puppy: number}"
      throw new Error "One of your pairs is not the required format"

  usedHumanNames = []
  usedPuppyNames = []

  for pair in solution
    human = pair.human
    puppy = pair.puppy

    if _.contains(usedHumanNames, human)
      console.error "You used #{human} twice!"
      throw new Error "You used the same human twice"

    if _.contains(usedPuppyNames, puppy)
      console.error "You used #{puppy} twice!"
      throw new Error "You used the same puppy twice"

  usedHumanNames.sort()
  usedPuppyNames.sort()
  givenHumanNames = _.keys(prefs.humans).sort()
  givenPuppyNames = _.keys(prefs.puppies).sort()

  for name, i in usedHumanNames
    unless name == givenHumanNames[i]
      console.error "#{name} was not in the list of given humans."
      throw new Error "Incorrect name used"
  for name, i in usedPuppyNames
    unless name == givenPuppyNames[i]
      console.error "#{name} was not in the list of given puppies."
      throw new Error "Incorrect name used"

  happiness = 0

  for pair in solution
    human = pair.human
    puppy = pair.puppy

    happiness += prefs.puppies[puppy].indexOf(human)
    happiness += prefs.humans[human].indexOf(puppy)

  output =
    happiness: happiness
    satisfaction: ((happiness*100)/(2*size*(size - 1)))

render = (solution, prefs, result) ->
  $humans = $('.humans')
  $puppies = $('.puppies')
  $humanRankings = $('.human-rankings')
  $puppyRankings = $('.puppy-rankings')

  _.each solution, (pair, i) ->
    human = pair.human
    puppy = pair.puppy

    $humans.append $("<td><img class='photo' src='img/#{human}.jpeg'/></td>")
    $puppies.append $("<td><img class='photo' src='img/#{puppy}.jpeg'/></td>")
    $humanRankings.append $("<td><strong>#{human}</strong><br><em>#{prefs.humans[human].indexOf(puppy)} points</em></td>")
    $puppyRankings.append $("<td><strong>#{puppy}</strong><br><em>#{prefs.puppies[puppy].indexOf(human)} points</em></td>")

  $(".happiness").text(result.happiness)
  $(".satisfaction").text(result.satisfaction.toFixed(2))

window.initGraphical = () ->
  size = 10
  prefs = generatePrefs(size)
  solution = solve(JSON.parse(JSON.stringify(prefs)), size)
  result = evalSolution(prefs, solution, size)
  render(solution, prefs, result)

window.initMultiple = () ->
  size = Number($('.sizeSelector').val())
  trials = Number($('.trialsSelector').val())

  $('.size').text(size)
  $('.trials').text(trials)

  console.log size, trials
  satisfaction = 0
  _(trials).times () ->
    prefs = generatePrefs(size)
    solution = window.solve(JSON.parse(JSON.stringify(prefs)), size)
    result = evalSolution(prefs, solution, size)
    satisfaction += result.satisfaction

  $(".satisfaction").text(satisfaction/trials)

$('body').on('change', '.sizeSelector, .trialsSelector', _.throttle(window.initMultiple, 1000))





