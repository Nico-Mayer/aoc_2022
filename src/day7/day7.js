const { getInput } = require('../Utils.js')
const input = getInput({ day: 7, sample: false })

const totalSpace = 70000000
const updateSize = 30000000

class Node {
    constructor(name) {
        this.name = name
    }
    parent = null
}

class Folder extends Node {
    children = []
    getSize() {
        let size = 0
        for (let child of this.children) {
            size += child.getSize()
        }
        return size
    }
    getSubFolders() {
        let folders = []
        for (let child of this.children) {
            if (child instanceof Folder) {
                folders.push(child)
            }
        }
        return folders
    }
}

class File extends Node {
    constructor(name, size) {
        super(name)
        this.size = size
    }
    getSize() {
        return this.size
    }
}

let root = new Folder('root', '/')
let currentFolder = root

for (let i = 1; i < input.length; i++) {
    const parts = input[i].split(' ')
    if (parts[0] === '$') {
        if (parts[1] === 'cd') {
            if (parts[2] === '..') {
                currentFolder = currentFolder.parent
            } else {
                for (let child of currentFolder.children) {
                    if (child.name === parts[2]) {
                        currentFolder = child
                        break
                    }
                }
            }
        }
    } else if (parts[0] === 'dir') {
        let folder = new Folder(parts[1])
        folder.parent = currentFolder
        currentFolder.children.push(folder)
    } else {
        let file = new File(parts[1], parseInt(parts[0]))
        file.parent = currentFolder
        currentFolder.children.push(file)
    }
}
// Part 1
let toCheck = root.getSubFolders()
let sum = 0
while (toCheck.length > 0) {
    let folder = toCheck.pop()
    if (folder.getSubFolders() !== []) {
        toCheck.push(...folder.getSubFolders())
    }
    if (folder.getSize() <= 100000) {
        sum += folder.getSize()
    }
}
console.log('Sum:', sum)
// Part 2
let usedSpace = root.getSize()
let freeSpace = totalSpace - usedSpace
let neededSpace = updateSize - freeSpace
console.log('Used space:', usedSpace)
console.log('Free space:', freeSpace)
console.log('Needed space:', neededSpace)

let toCheck2 = root.getSubFolders()

while (toCheck2.length > 0) {
    let folder = toCheck2.pop()
    if (folder.getSubFolders() !== []) {
        toCheck2.push(...folder.getSubFolders())
    }
    if (folder.getSize() >= neededSpace) {
        console.log('Folder:', folder.name, folder.getSize())
        sum += folder.getSize()
    }
}
