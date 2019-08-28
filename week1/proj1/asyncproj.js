var fs = require ('fs');
console.log("Reading from file")
fs.readFile('input.txt', (err,data) => {
    if(err) throw err;
    console.log(data.toString());
    console.log("Finish reading from file")
    console.log("Begin appending")
    fs.appendFile("input.txt", "Thank you AGAIN", (err)=>{
        if (err) throw (err);
            console.log("Finished appending")
            console.log("Being Re-Reading from file")
            fs.readFile("input.txt", (err, data) => {
                if (err) throw err;
                console.log(data.toString());
                console.log("Finish Re-reading from file")
        })
    })
});

