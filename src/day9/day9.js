const { sign } = require('crypto')
const { getInput } = require('../Utils.js')

const input = getInput({ day: 9, sample: false })
let steps = input.map((line) => {
	return line.split(' ')
})
let visited = new Set(['0,0'])

let [hx, hy] = [0, 0]
let [tx, ty] = [0, 0]

function touching(x1, y1, x2, y2) {
	return Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1
}

function moveHead(direction) {
	switch (direction) {
		case 'U':
			hy++
			break
		case 'R':
			hx++
			break
		case 'D':
			hy--
			break
		case 'L':
			hx--
			break
	}

	if (!touching(hx, hy, tx, ty)) {
		let sign_x
		let sign_y = 0

		if (hx == tx) {
			sign_x = 0
		} else {
			sign_x = (hx - tx) / Math.abs(hx - tx)
		}

		if (hy == ty) {
			sign_y = 0
		} else {
			sign_y = (hy - ty) / Math.abs(hy - ty)
		}

		tx += sign_x
		ty += sign_y
		visited.add(`${tx},${ty}`)
	}
}

steps.map((step) => {
	let [direction, distance] = step
	for (let i = 0; i < distance; i++) {
		moveHead(direction)
	}
})

console.log(visited.size)
