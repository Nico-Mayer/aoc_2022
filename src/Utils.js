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

function findCommonChar(str1, str2, str3 = '') {
  let commonChar = ''
  for (let i = 0; i < str1.length; i++) {
    let char = str1[i]
    if (str2.includes(char) && (str3 ? str3.includes(char) : true)) {
      commonChar = char
    }
  }
  return commonChar
}

module.exports = { toIntArray, sortIntArray, sortObjectArray, findCommonChar }
