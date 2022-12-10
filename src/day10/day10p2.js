const { getInput } = require('../Utils.js')
const input = getInput({ day: 10, sample: true })

let X = 1
let cycle = 0
let CRT = Array(6).fill('........................................')

for (let line of input) {
	console.log(line)
}

console.table(CRT)
