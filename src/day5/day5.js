const { getInput, reverseString } = require('../Utils.js')
const input = getInput({ day: 5, sample: false })
let numOfContainers = 0
let indexLine = ''
let drawing = []
let steps = []

let solutions = { p1: [], p2: [] }

input.map((line, index) => {
  if (line === '') {
    drawing = input.slice(0, index - 1)
    steps = input.slice(index + 1, input.length)
    indexLine = input[index - 1]
    numOfContainers = indexLine.replace(/\s+/g, '')
    numOfContainers = parseInt(numOfContainers.slice(-1))
  }
})

solutions.p1 = initContainers(numOfContainers)
solutions.p2 = initContainers(numOfContainers)

steps.map((step) => {
  let cleanStep = step
    .replace('move', '')
    .replace('from', ',')
    .replace('to', ',')
    .replace(/\s+/g, '')

  let [amount, from, to] = cleanStep.split(',')
  // Part 1
  crateMover(amount, solutions.p1[from - 1], solutions.p1[to - 1], 9000)
  //Part 2
  crateMover(amount, solutions.p2[from - 1], solutions.p2[to - 1], 9001)
})

function crateMover(amount, from, to, type) {
  let removedCrates = from.contents.slice(-amount)
  let remainingCrates = from.contents.slice(0, -amount)
  if (type === 9000) {
    removedCrates = reverseString(removedCrates)
  }
  from.contents = remainingCrates
  to.contents = to.contents + removedCrates
}

function getSolutionString(containers) {
  let res = ''
  containers.map((container) => {
    res += container.contents.slice(-1)
  })
  return res
}

function initContainers(num) {
  let res = []
  for (let i = 0; i < num; i++) {
    res.push({ id: i + 1, contents: '' })
  }
  drawing.map((line) => {
    for (i = 1; i < line.length; i += 4) {
      let index = parseInt(indexLine[i]) - 1
      if (line[i] !== ' ') {
        res[index].contents = line[i] + res[index].contents
      }
    }
  })
  return res
}

console.log('Part 1: ')
console.log(solutions.p1)
console.log('Solution String: ' + getSolutionString(solutions.p1))
console.log(' ')
console.log('Part 2: ')
console.log(solutions.p2)
console.log('Solution String: ' + getSolutionString(solutions.p2))
