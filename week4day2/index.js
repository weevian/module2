// STEP 1
// call express
var express = require ('express')
// define our app using express
var app = express();
// call body parser
var bodyParser = require('body-parser');

// STEP 2: ASSESS WHETHER NEED DB
// call mongoose
//var mongoose = require ('mongoose');

// var here must be the same as timestamp.js module export
// var Timestamp = require ('./timestamp')
// mongoose.connect('mongodb+srv://weevianapi:abcd1234@cluster0-piuqt.mongodb.net/test?retryWrites=true&w=majority')

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

// STEP 3: SET THE ROUTE
// set our port
var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res){
    res.json({ message:'welcome to WV API! Happy integrating!'});
});

router.get('/:date', function(req, res){
    if (+req.params.date){
        var date = new Date(+req.params.date*1000);
var hours = date.getHours();
var minutes = "0" + date.getMinutes();
var seconds = "0" + date.getSeconds();
var day = date.getDate();
var month = "0" + date.getMonth();
var year = "0" + date.getFullYear();

var formattedDate = day + '/' + month + '/' + '/' + year + ' ' + hours + ':' 
+ minutes.substr(-2) + ':' + seconds.substr(-2);
        res.json({unix: +req.params.date, natural: formattedDate})
        // + means parseInt
    }
    else {
        var date = new Date(req.params.date)
        var unixTimeStamp = date.getTime()/1000
        res.json({unix:unixTimeStamp, natural: req.params.date})
    }
})

// timestamp.save(function(err){
//     if (err){
//         res.send(err)
//     }
//     else {
//         res.json({message: 'Post works!'})
//     }
// })


app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);