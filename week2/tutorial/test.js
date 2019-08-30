var fs = require ('fs') 
var contents = fs.readFileSync('reqfile.txt')
var lineCount = contents.toString().split('\n').length
console.log(lineCount)