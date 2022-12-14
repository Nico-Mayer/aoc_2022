const { getInput } = require('../Utils.js')
const input = getInput({ day: 14, sample: false })

let maxRow = 0
let map = new Set()
// Parsing the input
let cornerRocks = input.map((line) => {
	line = line.split(' -> ')
	line = line.map((item) => {
		let [x, y] = item.split(',').map(Number)
		if (y > maxRow) maxRow = y
		return { x, y }
	})
	return line
})

// Add the Rocks to the map
for (const rocks of cornerRocks) {
	let currentRock = rocks.shift()
	while (rocks.length) {
		let targetRock = rocks.shift()
		// Draw a line between the two rocks
		while (
			currentRock.x !== targetRock.x ||
			currentRock.y !== targetRock.y
		) {
			map.add(`{x: ${currentRock.x}, y: ${currentRock.y}}`)
			if (currentRock.x !== targetRock.x) {
				let delta = currentRock.x > targetRock.x ? -1 : 1
				currentRock.x += delta
			} else {
				let delta = currentRock.y > targetRock.y ? -1 : 1
				currentRock.y += delta
			}
			map.add(`{x: ${currentRock.x}, y: ${currentRock.y}}`)
		}
	}
}

let stop = false
let sandBlocks = 0

// Part 1 Solution
/* while (!stop) {
	let spawn = { x: 500, y: 0 }

	while (1) {
		if (!map.has(`{x: ${spawn.x}, y: ${spawn.y + 1}}`)) {
			spawn.y++
		} else if (!map.has(`{x: ${spawn.x - 1}, y: ${spawn.y + 1}}`)) {
			spawn.x--
			spawn.y++
		} else if (!map.has(`{x: ${spawn.x + 1}, y: ${spawn.y + 1}}`)) {
			spawn.x++
			spawn.y++
		} else {
			sandBlocks++
			map.add(`{x: ${spawn.x}, y: ${spawn.y}}`)
			break
		}

		if (spawn.y > maxRow) {
			stop = true
			break
		}
	}
}
console.log(sandBlocks) */

// Part 2 Solution
while (!stop) {
	let spawn = { x: 500, y: 0 }

	if (map.has(`{x: ${spawn.x}, y: ${spawn.y}}`)) {
		break
	}
	sandBlocks++

	while (1) {
		if (spawn.y === maxRow + 1) {
			map.add(`{x: ${spawn.x}, y: ${spawn.y}}`)
			break
		} else if (!map.has(`{x: ${spawn.x}, y: ${spawn.y + 1}}`)) {
			spawn.y++
		} else if (!map.has(`{x: ${spawn.x - 1}, y: ${spawn.y + 1}}`)) {
			spawn.x--
			spawn.y++
		} else if (!map.has(`{x: ${spawn.x + 1}, y: ${spawn.y + 1}}`)) {
			spawn.x++
			spawn.y++
		} else {
			map.add(`{x: ${spawn.x}, y: ${spawn.y}}`)
			break
		}
	}
}
console.log(sandBlocks)
