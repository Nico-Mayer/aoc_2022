const { getInput, sliceIntoChunks, split, toIntArray } = require('../Utils.js')
const input = getInput({ day: 11, sample: false })

let rounds = 20
let monkeys = []
let superModulo = 1
let p2 = false

class Monkey {
	constructor(dna) {
		this.items = toIntArray(dna[1].slice(14).split(','))
		this.operation = dna[2].slice(17)
		this.test = parseInt(dna[3].slice(16))
		this.monkeyIfTrue = parseInt(dna[4].slice(-1))
		this.monkeyIfFalse = parseInt(dna[5].slice(-1))
		this.inspectedItems = 0
	}

	inspect() {
		let item = this.items[0]
		let [operator, value] = split(this.operation, 1)
		if (value === 'old') value = item
		else value = parseInt(value)
		operator === '+' ? (item += value) : (item *= value)
		this.inspectedItems++
		this.items[0] = item
	}
	testing() {
		if (p2) {
			this.items[0] = this.items[0] % superModulo
		} else {
			this.items[0] = Math.floor(this.items[0] / 3)
		}

		if (this.items[0] % this.test === 0) return this.monkeyIfTrue
		else return this.monkeyIfFalse
	}
	throwItem() {
		let item = this.items[0]
		this.items.shift()
		return item
	}
	addItem(item) {
		this.items.push(item)
	}
	hasItems() {
		return this.items.length > 0 ? true : false
	}
}

// Parse Input
let monkeyDNA = sliceIntoChunks(input, 7).map((chunk) => {
	return chunk.slice(0, 6).map((line) => {
		return line.replace(/\s/g, '')
	})
})
// init a Array of Monkeys
for (let dna of monkeyDNA) {
	superModulo *= dna[3].slice(16)
	monkeys.push(new Monkey(dna))
}
// Run the Simulation
for (let i = 0; i < rounds; i++) {
	for (let monkey of monkeys) {
		while (monkey.hasItems()) {
			monkey.inspect()
			let receiver = monkey.testing()
			monkeys[receiver].addItem(monkey.throwItem())
		}
	}
}
// Find the Monkey with the most items inspected and calculate the result
let monkeyBusiness = 1
let sortedMonkeys = monkeys.sort((a, b) => b.inspectedItems - a.inspectedItems)
sortedMonkeys.slice(0, 2).forEach((monkey) => {
	monkeyBusiness *= monkey.inspectedItems
})

console.log(monkeyBusiness)
