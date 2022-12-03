const { findCommonChars } = require('./Utils.js')
const { readFileSync } = require('fs')
const input = readFileSync('../resources/day3/input.txt', 'utf8').split(/\r?\n/)

let solution = { p1: 0, p2: 0 }
let group = []
let groups = []

input.map((line, index) => {
  getP1Solution(line)
  createGroupsArr(line, index)
})

function getP1Solution(line) {
  let mid = line.length / 2
  let rucksack1 = line.substring(0, mid)
  let rucksack2 = line.substring(mid, line.length)
  let commonItem = findCommonChars(rucksack1, rucksack2)[0]
  solution.p1 += getValue(commonItem)
}
function createGroupsArr(line, index) {
  group = [...group, line]
  if ((index + 1) % 3 === 0) {
    groups = [...groups, group]
    group = []
  }
}
function getValue(item) {
  let alhabet = 'abcdefghijklmnopqrstuvwxyz'
  if (item === item.toUpperCase()) {
    return alhabet.toUpperCase().indexOf(item) + 27
  } else {
    return alhabet.indexOf(item) + 1
  }
}
// Solution P2
for (let i = 0; i < groups.length; i++) {
  let item = findCommonChars(groups[i][0], groups[i][1], groups[i][2])[0]
  solution.p2 += getValue(item)
}

console.log(solution)
