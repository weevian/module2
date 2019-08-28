var fs = require('fs')

function finishTheProg(err, data){
    console.log(data.toString())
    console.log("FInish re-reading file")
}

function rereadingFile(err){
    if (err) console.log(err)
    console.log("Finished appending file")
    console.log("Begin RE-READING file")
    fs.readFile("input.txt", finishTheProg)
}

function appendFile(err, data){
if (err) console.log(err)
    console.log(data.toString())
console.log("Finished reading from file")
console.log("Beging RE-READING file")
fs.appendFile("input.txt", "HI HI HI HI HI ", rereadingFile)
}

console.log("Reading from file")
fs.readFile("input.txt", appendFile)