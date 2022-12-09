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

let rope = [
	new Point(0, 0),
	new Point(0, 0),
	new Point(0, 0),
	new Point(0, 0),
	new Point(0, 0),
	new Point(0, 0),
	new Point(0, 0),
	new Point(0, 0),
	new Point(0, 0),
	new Point(0, 0),
]
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

	if (direction === 'U') head.y++
	else if (direction === 'D') head.y--
	else if (direction === 'L') head.x--
	else if (direction === 'R') head.x++

	for (let i = 1; i < rope.length; i++) {
		let head = rope[i - 1]
		let tail = rope[i]
		follow(head, tail)
	}

	visited.add(JSON.stringify(rope[rope.length - 1]))
}

function follow(head, tail) {
	let inSameCol = head.x === tail.x
	let inSameRow = head.y === tail.y
	if (touching(head, tail)) return

	if (inSameCol) {
		if (head.y > tail.y) {
			tail.y++
		} else {
			tail.y--
		}
	} else if (inSameRow) {
		if (head.x > tail.x) {
			tail.x++
		} else {
			tail.x--
		}
	} else {
		if (head.x < tail.x && head.y < tail.y) {
			tail.x--
			tail.y--
		} else if (head.x > tail.x && head.y < tail.y) {
			tail.x++
			tail.y--
		} else if (head.y > tail.y && head.x < tail.x) {
			tail.y++
			tail.x--
		} else if (head.y > tail.y && head.x > tail.x) {
			tail.y++
			tail.x++
		}
	}
}

console.log(visited.size)
