const { getInput, stringHasDuplicates } = require('../Utils.js')

const input = getInput({ day: 6, sample: false })[0]
let solution = { i: 0, found: false }

let bufferLength = 14
let buffer = ''

for (let i = 0; i < input.length; i++) {
	buffer += input[i]
	if (buffer.length > bufferLength) {
		buffer = buffer.substring(1)
	}
	if (buffer.length === bufferLength && !solution.found) {
		if (!stringHasDuplicates(buffer)) {
			solution = { i: i + 1, found: true }
		}
	}
}

console.log(solution)
