const { getInput, sliceIntoChunks, split, toIntArray } = require('../Utils.js')
const input = getInput({ day: 11, sample: false })

let monkeyTexts = sliceIntoChunks(input, 7).map((chunk) => {
	return chunk.slice(0, 6)
})

let rounds = 10000

let monkeys = []

class Monkey {
	constructor(text) {
		this.id = text[0][7]
		this.items = toIntArray(text[1].replace(/\s/g, '').slice(14).split(','))
		this.operation = text[2].replace(/\s/g, '').slice(17)
		this.test = parseInt(text[3].replace(/\s/g, '').slice(16))
		this.monkeyIfTrue = parseInt(text[4].replace(/\s/g, '').slice(-1))
		this.monkeyIfFalse = parseInt(text[5].replace(/\s/g, '').slice(-1))
	}

	inspectedItems = 0

	inspect() {
		console.log('Execute Inspection')
		let item = this.items[0]
		let [operator, value] = split(this.operation, 1)
		if (value === 'old') value = this.items[0]
		else value = parseInt(value)

		//console.log(item, operator, value)

		switch (operator) {
			case '+':
				item += value
				break
			case '*':
				item *= value
				break
		}
		this.inspectedItems++
		this.items[0] = item
		//console.log(item, operator, value)
	}

	testing() {
		console.log('Execute Testing')
		this.items[0] = Math.floor(this.items[0] / 3)
		if (this.items[0] % this.test === 0) {
			return this.monkeyIfTrue
		} else {
			return this.monkeyIfFalse
		}
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
		if (this.items.length > 0) return true
		else return false
	}
}

for (let text of monkeyTexts) {
	monkeys.push(new Monkey(text))
}

for (let i = 0; i < rounds; i++) {
	for (let monkey of monkeys) {
		while (monkey.hasItems()) {
			//console.log('While Loop Monkey: ' + monkey.id)

			//console.log(monkey)
			monkey.inspect()
			//console.log(monkey)
			let receiver = monkey.testing()
			//console.log(monkey)
			monkeys[receiver].addItem(monkey.throwItem())
			//console.log(monkey)
			//console.log(' ')
		}
	}
}

console.log(monkeys)
