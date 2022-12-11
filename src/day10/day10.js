const { getInput, replaceAt } = require('../Utils.js')
const input = getInput({ day: 10, sample: false })

let X = 1
let cycle = 0
let CRT = Array(6).fill(new Array(40).join(' '))
let interestingCycles = [20, 60, 100, 140, 180, 220]
let solution = 0

for (let line of input) {
	let op = line.split(' ')

	if (op[0] === 'noop') {
		runCycle()
	} else if (op[0] === 'addx') {
		let value = parseInt(op[1])
		runCycle()
		runCycle()

		X += value
	}
}

function runCycle() {
	updateCRT(X, cycle)
	cycle += 1
	if (interestingCycles.includes(cycle)) {
		solution += calcSignalStrength(cycle, X)
	}
}

function updateCRT(spriteIndex, cycle) {
	let row

	if (cycle < 40) row = 0
	else if (cycle < 80) row = 1
	else if (cycle < 120) row = 2
	else if (cycle < 160) row = 3
	else if (cycle < 200) row = 4
	else if (cycle < 240) row = 5

	let pixelIndex = cycle % 40
	let sprite = [spriteIndex - 1, spriteIndex, spriteIndex + 1]

	if (sprite.includes(pixelIndex)) {
		CRT[row] = replaceAt(CRT[row], pixelIndex, '▓')
	}
}

function calcSignalStrength(cycle, X) {
	return cycle * X
}
console.log('Signal Score: ' + solution)
console.table(CRT)
