const { readFileSync } = require('fs')
const input = readFileSync('../resources/day4/input.txt', 'utf8').split(/\r?\n/)

let pairs = []
let solution = { p1: 0, p2: 0 }

input.map((line) => {
  let numbers = line.split(',')
  pairs = [
    {
      elf1: getRange(numbers[0]),
      elf2: getRange(numbers[1]),
      fullyContains: fullyContains(getRange(numbers[0]), getRange(numbers[1])),
      overlapping: contains(getRange(numbers[0]), getRange(numbers[1])),
    },
    ...pairs,
  ]
})

pairs.map((pair) => {
  if (pair.fullyContains) solution.p1 += 1
  if (pair.overlapping) solution.p2 += 1
})

console.log(solution)

function fullyContains(arr1, arr2) {
  return (
    arr2.every((item) => arr1.includes(item)) ||
    arr1.every((item) => arr2.includes(item))
  )
}

function contains(arr1, arr2) {
  return arr2.some((item) => arr1.includes(item))
}

function getRange(range) {
  let res = []
  let numbers = range.split('-')
  for (let i = parseInt(numbers[0]); i <= parseInt(numbers[1]); i++) {
    res.push(i)
  }
  return res
}
