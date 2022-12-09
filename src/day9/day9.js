const { getInput } = require('../Utils.js')

const input = getInput({ day: 9, sample: false })
let steps = input.map((line) => {
	return line.split(' ')
})

let [hx, hy] = [0, 0]
let [tx, ty] = [0, 0]
let visited = new Set(['0,0'])

steps.map((step) => {
	let [direction, distance] = step
	for (let i = 0; i < distance; i++) {
		move(direction)
	}
})

function touching(x1, y1, x2, y2) {
	let xDiff = Math.abs(x1 - x2)
	let yDiff = Math.abs(y1 - y2)
	if (yDiff > 1 || xDiff > 1) return false
	return true
}

function move(direction) {
	let [prevX, prevY] = [hx, hy]

	if (direction === 'U') hy++
	else if (direction === 'D') hy--
	else if (direction === 'L') hx--
	else if (direction === 'R') hx++

	if (!touching(hx, hy, tx, ty)) {
		tx = prevX
		ty = prevY
		visited.add(`${tx},${ty}`)
	}
}

console.log(visited.size)
