const { sortObjectArray, getInput } = require('../Utils.js')
const input = getInput({ day: 1, sample: false })
let calories = 0
let elfs = []
let elfIndex = 0

input.map((line) => {
  if (line === '') {
    elfs = [{ elfIndex: elfIndex, calories: calories }, ...elfs]
    calories = 0
    elfIndex += 1
  } else calories += parseInt(line)
})

// Part 1
console.log(sortObjectArray(elfs, 'calories', 'desc')[0].calories)
// Part 2
console.log(sortObjectArray(elfs, 'calories', 'desc').splice(0, 3))
