const { getInput, replaceAt } = require('../Utils.js')
const input = getInput({ day: 10, sample: false })

let X = 1
let cycle = 0

let CRT = Array(6).fill('........................................')

for (let line of input) {
	let op = line.split(' ')

	if (op[0] === 'noop') {
		updateCRT(X, cycle)
		cycle += 1
	} else if (op[0] === 'addx') {
		let value = parseInt(op[1])
		updateCRT(X, cycle)
		cycle += 1

		updateCRT(X, cycle)
		cycle += 1

		X += value
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

	console.log(
		'Row: ' + row + ' PixelIndex: ' + pixelIndex + ' Sprite: ' + sprite
	)

	if (sprite.includes(pixelIndex)) {
		console.log('Print Pixel At: ' + pixelIndex)
		CRT[row] = replaceAt(CRT[row], pixelIndex, '#')
	}
	console.log(' ')
}

console.table(CRT)
