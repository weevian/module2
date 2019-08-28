var fs = require ('fs');
console.log("Reading from file")
var data = fs.readFileSync("input.txt")
console.log(data.toString())
console.log("Finish reading from file")
console.log("Begin appending")
try {
    fs.appendFileSync('input.txt', 'THANK YOU LOL');
    console.log('The "data to append" was appended to file!');
  } catch (err) {
    /* Handle the error */
  }
  console.log("Re-Reading from file")
  var data = fs.readFileSync("input.txt")
  console.log(data.toString())
  console.log("Finish Re-reading from file")