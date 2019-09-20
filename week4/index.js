var express = require ('express') //call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var Kindergarten = require('./kindergarten') //var here must be the same as kindergarten.js module exports.
var User = require('./users')
var auth = require ('./auth')()
var jwt = require ('jsonwebtoken')
var config = require ('./config')
// var Review = require('./review')
mongoose.connect('mongodb+srv://weevianapi:abcd1234@cluster0-piuqt.mongodb.net/test?retryWrites=true&w=majority') // connect to mongodb

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var router = express.Router();

router.get('/', function(req, res){
    res.json({ message:'hooray! welcome to our api'});
});

// POST and GET use the same URL

router.route('/kindergartens') 

.post(function(req, res){
    var kindergarten = new Kindergarten();
    kindergarten.name = req.body.name;
    kindergarten.description = req.body.description;
    kindergarten.email = req.body.email;
    kindergarten.phone = req.body.phone;
    kindergarten.url = req.body.url;
    kindergarten.opening_hours = req.body.opening_hours;
    kindergarten.image_url = req.body.image_url;
    kindergarten.latitude = req.body.latitude;
    kindergarten.longitude = req.body.longitude;

    kindergarten.save(function(err){
        if (err) {
            res.send(err)
        }
        else {
            res.json({message: 'Kindergarten successfully added!'})
        }
    })
})

// another URL link - to GET all kindergartens

.get(function(req, res){
    Kindergarten.find(function(err, kindergartens){
        if (err){
            res.send(err);
        }
        else {
            res.json({status:"ok", data:kindergartens})
        }
    })
})

// another URL link - to GET a single kindergarten by ID

router.route('/kindergartens/:id')

.get(function(req, res){
Kindergarten.findById(req.params.id, function(err,kindergarten){
    if (err){
        res.error(err)
    }
    else {
        res.json({status: "ok", data:kindergarten})
    }
})
})

// URL route - REVIEW

router.route('/kindergartens/:id/reviews')

.post(function(req, res){
var newReview = {
    username: req.body.username,
    rating: req.body.rating,
    message: req.body.message
}
Kindergarten.findById(req.params.id, function(err, kindergarten){
    if (kindergarten.reviews.length > 0){
        console.log("scenario a", newReview.rating)
        kindergarten.avgRating = (newReview.rating +
            (kindergarten.reviews.length *kindergarten.avgRating))
            /
            (kindergarten.reviews.length + 1)
            kindergarten.reviews.push(newReview)
    } else {
        console.log("scenario b", newReview.rating)
        kindergarten.reviews = [newReview]
        kindergarten.avgRating = newReview.rating
    }
    kindergarten.save(function(err){
        if(err){
            res.send(err)
        } else {
            res.json({message: "Review succesfully added!"})
        }
    })
    })
})
.get(function(req,res){
Kindergarten.findById(req.params.id, function(err, kindergarten){
    if(err){
        res.send(err)
    } else {
        res.json({status:"ok", data:kindergarten.reviews})
    }
})

})
// another URL - to update

router.route('/kindergartens/:id')

.post(function(req,res){
    Kindergarten.findById(req.params.id, function(err, kindergarten){
        if (err){
            res.error(err)
        }
        else {
            kindergarten.name = req.body.name;
            kindergarten.description = req.body.description;
            kindergarten.email = req.body.email;
            kindergarten.phone = req.body.phone;
            kindergarten.url = req.body.url;
            kindergarten.opening_hours = req.body.opening_hours;
            kindergarten.image_url = req.body.image_url;
            kindergarten.latitude = req.body.latitude;
            kindergarten.longitude = req.body.longitude;
            
            kindergarten.save(function(err){
                if (err){
                    res.error(err)
                }
                else {
                    res.send({message: 'Kindergarten successfully updated!'})
                }
            })
        } 
    })
})

router.get('/find-top-5', function(req, res){
Kindergarten.find().limit(5).sort({avgRating:-1}).exec(function(err,kindergarten){
if (err) {
    res.send(err)
} else {
    res.json({data:kindergartens}) //will show 5 kindergartens, so plural here
}
})
})

router.get('/latest-addition', function(req,res){
    Kindergarten.find().limit(1).sort({createdAt:-1}).exec(function(err,kindergarten){
        if (err) {
            res.send (err)
        } else {
            res.json({data:kindergarten})
        }
    })
})

router.get('/search/:searchText',function(req,res){
    Kindergarten.find({name:{"$regex":req.params.searchText, "$options":"i"}})
    .exec(function(err, kindergartens){
        if (err) {
            res.send(err)
        } else {
            res.json({data:kindergartens})
        }
    })
})

//--------------------------------------------------------
// USER API

router.route('/register')

.post(function(req, res){
    var newUser = new User();
    newUser.username = req.body.username;
    newUser.password = req.body.password

    newUser.save(function(err){
        if (err){
            res.send (err)
        } else {
            res.json ({message:'User registration successful!'})
        }
    })
})

router.route('/login')

.post(function(req, res){
    User.findOne({username:req.body.username}, function(err, user){
            if (user){
                user.comparePassword(req.body.password, function(err, isMatch){
                    var token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 10080
                    })
                    res.json({success: true, token:"JWT" + token})
                })
            } else {
            res.send({success: false, message: 'Authentication failed'})
            }
    }) 
})



app.use(auth.initialize())
app.use('/api', router);

app.listen(port);

console.log('Magic happens on port' + port);
