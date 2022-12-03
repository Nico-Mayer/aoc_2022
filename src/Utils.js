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

module.exports = {
  toIntArray,
  sortIntArray,
  sortObjectArray,
  findCommonChars,
  sortStringArrayByLength,
  sliceIntoChunks,
}
