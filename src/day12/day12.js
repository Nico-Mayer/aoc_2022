const { getInput } = require('../Utils.js')

const input = getInput({ day: 12, sample: false })
let start = [0, 0]
let end = [0, 0]
let grid = input.map((row) => row.split(''))

let que = []
let visited = new Set()

let possibleStarts = []

// Find start and end positions
for (let row = 0; row < grid.length; row++) {
	for (let col = 0; col < grid[row].length; col++) {
		if (grid[row][col] === 'S') {
			start = [row, col]
			grid[row][col] = 'a'
		}
		if (grid[row][col] === 'a') possibleStarts.push([row, col])
		if (grid[row][col] === 'E') {
			end = [row, col]
			grid[row][col] = 'z'
		}
	}
}

let sol = []

for (let start of possibleStarts) {
	que.push([0, ...start])
	visited.add(`${[0, 0]}`)

	while (que.length > 0) {
		const [dist, row, col] = que.shift()
		let neighbors = getNeighbors([row, col])

		if (row == end[0] && col == end[1]) {
			sol.push({ start: start, dist: dist })
			visited.clear()
			que = []
			break
		}

		for (let neighbor of neighbors) {
			que.push([dist + 1, neighbor[0], neighbor[1]])
			visited.add(`${neighbor}`)
		}
	}
}

console.log(sol)

function getNeighbors([row, col]) {
	const neighbors = []
	if (row > 0) neighbors.push([row - 1, col])
	if (row < grid.length - 1) neighbors.push([row + 1, col])
	if (col > 0) neighbors.push([row, col - 1])
	if (col < grid[row].length - 1) neighbors.push([row, col + 1])

	let movableNeighbors = []
	let height = calcElevation(grid[row][col])

	for (neighbor of neighbors) {
		let neighborHeight = calcElevation(grid[neighbor[0]][neighbor[1]])
		if (
			neighborHeight === height + 1 ||
			(neighborHeight <= height && !visited.has(`${neighbor}`))
		) {
			movableNeighbors.push(neighbor)
		}
	}

	return movableNeighbors
}

function calcElevation(position) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz'
	return alphabet.indexOf(position)
}
