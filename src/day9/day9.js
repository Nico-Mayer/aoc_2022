const { getInput } = require('../Utils.js')
const input = getInput({ day: 9, sample: false })
let steps = input.map((line) => {
	return line.split(' ')
})

class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

let rope = [new Point(0, 0), new Point(0, 0)]
let visited = new Set([JSON.stringify(rope[0])])

steps.map((step) => {
	let [direction, distance] = step
	for (let i = 0; i < distance; i++) {
		move(direction)
	}
})

function touching(pointA, pointB) {
	let xDiff = Math.abs(pointA.x - pointB.x)
	let yDiff = Math.abs(pointA.y - pointB.y)
	if (yDiff > 1 || xDiff > 1) return false
	return true
}

function move(direction) {
	let head = rope[0]
	let tail = rope[1]
	let [prevX, prevY] = [head.x, head.y]

	if (direction === 'U') head.y++
	else if (direction === 'D') head.y--
	else if (direction === 'L') head.x--
	else if (direction === 'R') head.x++

	if (!touching(head, tail)) {
		tail.x = prevX
		tail.y = prevY
	}

	visited.add(JSON.stringify(rope[rope.length - 1]))
}

console.log(visited.size)
