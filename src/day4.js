const { readFileSync } = require('fs')
const { containsAll, containsSingle } = require('./Utils')
const input = readFileSync('../resources/day4/input.txt', 'utf8').split(/\r?\n/)

let solution = { p1: 0, p2: 0 }

input.map((line) => {
  let [num1, num2] = line.split(',')
  let elf1 = getRange(num1)
  let elf2 = getRange(num2)
  if (containsAll(elf1, elf2) || containsAll(elf2, elf1)) solution.p1++
  if (containsSingle(elf1, elf2)) solution.p2++
})

console.log(solution)

function getRange(range) {
  let res = []
  let [start, end] = range.split('-')
  for (let i = parseInt(start); i <= parseInt(end); i++) {
    res.push(i)
  }
  return res
}
