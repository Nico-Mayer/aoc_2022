const { getInput } = require('../Utils.js')

const input = getInput({ day: 10, sample: true })
let cycle = 0
let X = 1

let interestingCycles = [20, 60, 100, 140, 180, 220]
let solution = 0

input.map((line) => {
	const instruction = line.split(' ')

	if (instruction[0] === 'noop') {
		cycle += 1

		if (interestingCycles.includes(cycle)) {
			solution += calcSignalStrength(cycle, X)
		}
	} else if (instruction[0] === 'addx') {
		let value = parseInt(instruction[1])
		X += value
		cycle += 1

		if (interestingCycles.includes(cycle)) {
			solution += calcSignalStrength(cycle, X - value)
		}

		cycle += 1
		if (interestingCycles.includes(cycle)) {
			solution += calcSignalStrength(cycle, X - value)
		}
	}
})

function calcSignalStrength(cycle, X) {
	return cycle * X
}

console.table(solution)
