function toIntArray(array) {
  return array.map((item) => parseInt(item))
}

function sortIntArray(array, order = 'asc') {
  if (order === 'asc') {
    return array.sort((a, b) => a - b)
  } else if (order === 'desc') {
    return array.sort((a, b) => b - a)
  }
}

function sortObjectArray(array, key, order = 'asc') {
  if (order === 'asc') {
    return array.sort((a, b) => a[key] - b[key])
  } else if (order === 'desc') {
    return array.sort((a, b) => b[key] - a[key])
  }
}

module.exports = { toIntArray, sortIntArray, sortObjectArray }
