const { sortObjectArray } = require('../Utils.js')
const { readFileSync } = require('fs')
const input = readFileSync('./input.txt', 'utf8').split(/\r?\n/)

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
console.log(sortObjectArray(elfs, 'calories', 'desc')[0])
// Part 2
console.log(sortObjectArray(elfs, 'calories', 'desc').splice(0, 3))
