const { readFileSync } = require('fs')

function toIntArray(array) {
  return array.map((item) => parseInt(item))
}

function sliceIntoChunks(array, chunkSize) {
  let chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

function sortIntArray(array, order = 'asc') {
  if (order === 'asc') {
    return array.sort((a, b) => a - b)
  } else if (order === 'desc') {
    return array.sort((a, b) => b - a)
  }
}

function sortStringArrayByLength(array, order = 'asc') {
  if (order === 'asc') {
    return array.sort((a, b) => a.length - b.length)
  } else if (order === 'desc') {
    return array.sort((a, b) => b.length - a.length)
  }
}

function sortObjectArray(array, key, order = 'asc') {
  if (order === 'asc') {
    return array.sort((a, b) => a[key] - b[key])
  } else if (order === 'desc') {
    return array.sort((a, b) => b[key] - a[key])
  }
}

function findCommonChars(str1, str2, str3 = '') {
  let commonChar = []
  for (let i = 0; i < str1.length; i++) {
    let char = str1[i]
    if (str2.includes(char) && (str3 ? str3.includes(char) : true)) {
      commonChar = [...commonChar, char]
    }
  }
  return commonChar
}

function containsAll(arr1, arr2) {
  return arr2.every((item) => arr1.includes(item))
}

function containsSingle(arr1, arr2) {
  return arr2.some((item) => arr1.includes(item))
}

function reverseString(str) {
  return str.split('').reverse().join('')
}

function stringHasDuplicates(string) {
  let hasDuplicate = string.split('').length !== new Set(string.split('')).size
  return hasDuplicate ? true : false
}

function getInput({ day, sample }) {
  const path = sample ? 'sample' : 'input'
  let data
  console.log(`Loading data for day ${day} Type: ${path}`)
  console.log()
  try {
    data = readFileSync(`../resources/day${day}/${path}.txt`, 'utf8')
  } catch (err) {
    //console.log('Loaded from Source')
    data = readFileSync(`../../resources/day${day}/${path}.txt`, 'utf8')
  }

  return data.split(/\r?\n/)
}

module.exports = {
  toIntArray,
  sortIntArray,
  sortObjectArray,
  findCommonChars,
  sortStringArrayByLength,
  sliceIntoChunks,
  containsAll,
  containsSingle,
  getInput,
  reverseString,
  stringHasDuplicates,
}
