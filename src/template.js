const { toIntArray, sortIntArray, sortObjectArray } = require('./Utils.js')
const { readFileSync } = require('fs')
const sample = true
const inputPath = '../resources/dayX/' + (sample ? 'sample' : 'input') + '.txt'

const input = readFileSync(inputPath, 'utf8').split(/\r?\n/)
