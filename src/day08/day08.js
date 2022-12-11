const { getInput } = require('../Utils.js')
const input = getInput({ day: 8, sample: false })

class Tree {
	constructor(height) {
		this.height = height
	}
	scenicScore = 0
	visible = true
}

let grid = input.map((line) => {
	let numbers = line.split('').map((n) => new Tree(parseInt(n)))
	return numbers
})

// Iterate through the grid
for (let row = 1; row < grid.length - 1; row++) {
	for (let col = 1; col < grid[row].length - 1; col++) {
		let tree = grid[row][col]

		let left = grid[row].slice(0, col)
		let right = grid[row].slice(col + 1)
		let top = grid.slice(0, row).map((row) => row[col])
		let down = grid.slice(row + 1).map((row) => row[col])

		if (!isVisible(tree, left, right, top, down)) tree.visible = false

		tree.scenicScore = calcScenicScore(tree, left, right, top, down)
	}
}

// Functions Part 1
function isHigher(tree, otherTrees) {
	let higher = true
	for (let i = 0; i < otherTrees.length; i++) {
		if (otherTrees[i].height >= tree.height) higher = false
	}
	return higher
}

function isVisible(tree, leftTrees, rightTrees, topTrees, bottomTrees) {
	return (
		isHigher(tree, leftTrees) ||
		isHigher(tree, rightTrees) ||
		isHigher(tree, topTrees) ||
		isHigher(tree, bottomTrees)
	)
}

function countVisible(trees) {
	let count = 0
	for (let row = 0; row < trees.length; row++) {
		for (let col = 0; col < trees[row].length; col++) {
			let tree = trees[row][col]
			if (tree.visible) count++
		}
	}
	return count
}

// Functions Part 2
function calcScenicScore(tree, leftTrees, rightTrees, topTrees, bottomTrees) {
	let leftDistance = getDistance(tree, leftTrees.reverse())
	let rightDistance = getDistance(tree, rightTrees)
	let topDistance = getDistance(tree, topTrees.reverse())
	let bottomDistance = getDistance(tree, bottomTrees)

	return leftDistance * rightDistance * topDistance * bottomDistance
}

function getDistance(tree, trees) {
	let distance = 0
	for (let i = 0; i < trees.length; i++) {
		distance += 1
		if (trees[i].height >= tree.height) break
	}
	return distance
}

function bestScenicScore(trees) {
	let score = 0

	for (let row = 0; row < trees.length; row++) {
		for (let col = 0; col < trees[row].length; col++) {
			let tree = trees[row][col]
			if (tree.scenicScore > score) {
				score = tree.scenicScore
			}
		}
	}
	return score
}

console.log(bestScenicScore(grid))
console.log(countVisible(grid))
