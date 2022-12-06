const { getInput, stringHasDuplicates } = require('../Utils.js')

const input = getInput({ day: 6, sample: false })[0]
let solution = {
  p1: { index: 0, found: false },
  p2: { index: 0, found: false },
}

let buffer = ''
let messageBuffer = ''
for (let i = 0; i < input.length; i++) {
  buffer += input[i]
  messageBuffer += input[i]
  if (buffer.length > 4) {
    buffer = buffer.substring(1)
  }
  if (buffer.length === 4 && !solution.p1.found) {
    if (!stringHasDuplicates(buffer)) {
      solution.p1 = { index: i + 1, found: true }
    }
  }
  if (messageBuffer.length > 14) {
    messageBuffer = messageBuffer.substring(1)
  }
  if (messageBuffer.length === 14 && !solution.p2.found) {
    if (!stringHasDuplicates(messageBuffer)) {
      solution.p2 = { index: i + 1, found: true }
    }
  }
}

console.log(solution)
