const { findCommonChars, sliceIntoChunks } = require('./Utils.js')
const { readFileSync } = require('fs')
const input = readFileSync('../resources/day3/input.txt', 'utf8').split(/\r?\n/)

let solution = { p1: 0, p2: 0 }
let groups = sliceIntoChunks(input, 3)

input.map((line) => {
  getP1Solution(line)
})

for (let i = 0; i < groups.length; i++) {
  let item = findCommonChars(groups[i][0], groups[i][1], groups[i][2])[0]
  solution.p2 += getValue(item)
}

console.log(solution)

function getP1Solution(line) {
  let mid = line.length / 2
  let rucksack1 = line.substring(0, mid)
  let rucksack2 = line.substring(mid, line.length)
  let commonItem = findCommonChars(rucksack1, rucksack2)[0]
  solution.p1 += getValue(commonItem)
}

function getValue(item) {
  let alhabet = 'abcdefghijklmnopqrstuvwxyz'
  if (item === item.toUpperCase()) {
    return alhabet.toUpperCase().indexOf(item) + 27
  } else {
    return alhabet.indexOf(item) + 1
  }
}
