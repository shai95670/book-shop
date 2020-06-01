function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function getLorem(){
  var words = [
    'there',
    'was',
    'a',
    'donkey',
    'which',
    'lived',
    'dan',
    'usa',
    'now'
  ]
  return words.map(function(){
    return words[Math.floor(Math.random() * words.length)]
  }).join(' ')
}