const { containsAll, containsSingle, getInput } = require('../Utils')
const input = getInput({ day: 4, sample: false })

let solution = { p1: 0, p2: 0 }

input.map((line) => {
  let [elf1, elf2] = line.split(',')
  let itemsElf1 = getRange(elf1)
  let itemsElf2 = getRange(elf2)

  if (containsAll(itemsElf1, itemsElf2) || containsAll(itemsElf2, itemsElf1)) {
    solution.p1++
  }
  if (containsSingle(itemsElf1, itemsElf2)) solution.p2++
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
