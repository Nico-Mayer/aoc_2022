const { getInput } = require('../Utils.js')
const input = getInput({ day: 2, sample: false })

let solution = { p1: 0, p2: 0 }

input.map((line) => {
	let you = line[2]
	let opp = line[0]
	solution.p1 += result(you, opp, 1)
	solution.p2 += result(you, opp, 2)
})

function result(you, opp, part) {
	switch (you) {
		case 'X':
			if (opp === 'A') return part == 1 ? 4 : 3
			if (opp === 'B') return part == 1 ? 1 : 1
			if (opp === 'C') return part == 1 ? 7 : 2
		case 'Y':
			if (opp === 'A') return part == 1 ? 8 : 4
			if (opp === 'B') return part == 1 ? 5 : 5
			if (opp === 'C') return part == 1 ? 2 : 6
		case 'Z':
			if (opp === 'A') return part == 1 ? 3 : 8
			if (opp === 'B') return part == 1 ? 9 : 9
			if (opp === 'C') return part == 1 ? 6 : 7
	}
}

console.log(solution)
