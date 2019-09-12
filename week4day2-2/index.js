// STEP 1
// call express
var express = require ('express')
// define our app using express
var app = express();
// call body parser
var bodyParser = require('body-parser');

// STEP 2: ASSESS WHETHER NEED DB
// call mongoose
var mongoose = require ('mongoose');

// var here must be the same asurl.js module export
var Url = require ('./urls')
mongoose.connect('mongodb+srv://weevianapi:abcd1234@cluster0-piuqt.mongodb.net/test?retryWrites=true&w=majority')

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

// STEP 3: SET THE ROUTE
// set our port
var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res){
    res.json({ message:'welcome to URL Shortener API! Happy integrating!'});
});

router.get('/new/:url', function(req, res){
Url.estimatedDocumentCount(function(err, count){
    console.log(count)
var newUrl = new Url();
newUrl.url = req.params.url
newUrl.urlId = count;
newUrl.save(function(err){
    if (err){
        res.send({message: 'error something is wrong' + err})
    }
    else {
        res.json({original_url: req.params.url, short_url:"localhost:8080/"+count})
    }
})
})
});

router.get('/:number', function(req, res){
   
});


app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);