// This is just a CLI, if you want to you can just run the source code for each day in their respective folders
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const finished = 5

getUserInput()

function getUserInput() {
  rl.question(`Enter Advent of Code Day (1-${finished}): `, (input) => {
    let day = parseInt(input)
    if (isNaN(day)) {
      console.log(
        `Invalid input, please enter a number between 1 and ${finished}`
      )
      console.log(' ')
      return getUserInput()
    } else if (day < 1 || day > finished) {
      console.log(
        `Invalid input, please enter a number between 1 and ${finished}`
      )
      console.log(' ')
      return getUserInput()
    } else {
      console.log(' ')
      runDay(day)
    }
    rl.close()
  })
}

function runDay(day) {
  require(`./day${day}/day${day}.js`)
}

rl.on('close', function () {
  console.log('\nBYE BYE !!!')
  process.exit(0)
})
