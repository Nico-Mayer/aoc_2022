const { getInput, sliceIntoChunks } = require('../Utils.js')
const input = getInput({ day: 13, sample: false })

let buffer = []
let buffer2 = []
// Parse Input
input.map((line) => {
	if (line.length !== 0) {
		buffer.push(JSON.parse(line))
		buffer2.push(JSON.parse(line))
	}
})
buffer = sliceIntoChunks(buffer, 2)
let pairs = buffer.map((pair) => {
	let [left, right] = pair
	return { left: left, right: right }
})

// Part 1
let solution = 0
for (let i = 0; i < pairs.length; i++) {
	let { left, right } = pairs[i]

	if (compare(left, right) < 0) {
		solution += i + 1
	}
}

// Part 2
let index2 = 1
let index6 = 2

for (let i = 0; i < buffer2.length; i++) {
	if (compare(buffer2[i], [[2]]) < 0) {
		index2++
		index6++
	} else if (compare(buffer2[i], [[6]]) < 0) {
		index6++
	}
}

console.log(index2 * index6)

function compare(left, right) {
	if (Number.isInteger(left)) {
		if (Number.isInteger(right)) {
			return left - right
		} else if (Array.isArray(right)) {
			return compare([left], right)
		}
	} else if (Number.isInteger(right)) {
		return compare(left, [right])
	} else {
		let leftLength = left.length
		let rightLength = right.length
		let shorterLength = Math.min(leftLength, rightLength)

		for (let i = 0; i < shorterLength; i++) {
			let value = compare(left[i], right[i])
			if (value !== 0) return value
		}
		return leftLength - rightLength
	}
}

console.log(solution)
