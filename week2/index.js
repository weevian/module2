var Botkit = require('botkit')
const request = require('request');

if (!process.env.token) {
 console.log('Error: Specify token in environment');
 process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false
});

controller.spawn({
 token: process.env.token
}).startRTM(function(err) {
 if (err) {
 throw new Error(err);
 }
});

controller.hears(
    ['hi', 'hello', 'yo', 'howdy'], 'direct_message,direct_mention,mention',
function(bot, message) {
 bot.reply(message, 'Hello wassup! :wave:');
});

controller.hears(['wod'], 
'direct_message,direct_mention,mention', function(bot, message) {
    var students = ["Wen Ling", "Jia Hui", "Wei Ning", "Erin", "Wee Vian", "Melissa",
"Nico", "Satish"]
var randomNumber = Math.floor(Math.random() * students.length)
var selectedStudent = students[randomNumber]
var messages = [selectedStudent + ' wants to do the exercise', 
selectedStudent + ' is a pro',
selectedStudent + ' loves bubble tea',
selectedStudent + ' jio yumcha'
]
var randomMsg = Math.floor(Math.random()*messages.length)
 bot.reply (message, messages[randomMsg])
})

controller.hears(
    ['trip'], 'direct_message,direct_mention,mention',
function(bot, message) {
 bot.startConversation(message, function(err, convo){
    
    var place = ''
    var days = 0
    var persons = 0
    var friend = ''
    var purpose = ''
    
    convo.addQuestion('Hi! Where do you like to go?', function(response, convo){
         place = response.text
         bot.reply(message, place + ' is a nice place!')
         convo.next();
     },{},'default');

     convo.addQuestion('How many days are you staying?', function(response, convo){
        days = response.text
        bot.reply(message, 'Great! You are staying for ' + days + ' days.')
        convo.next();
    },{},'default');

    convo.addQuestion('How many people will be going?', function(response, convo){
       var randomPPP = 100 + Math.floor((Math.random() * 500))
       persons = response.text
       var finalPrice = randomPPP*persons*days
       convo.say('So, you going to ' 
       + place 
       + ' for ' 
       + days 
       + ' days, with all together ' 
       + persons 
       + ' persons. Your total price is $' 
       + finalPrice)
       convo.next();
    },{},'default'); 
});
});


controller.hears(
    ['weather'], 'direct_message,direct_mention,mention',
function(bot, message) {
 bot.startConversation(message, function(err, convo){
var city = ''
     convo.addQuestion('Hi! Tell me where you are?', function(response, convo){ 
        city = response.text
            
         request("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b6907d289e10d714a6e88b30761fae22", function (error, response, body) {
             console.error('error:', error); // Print the error if one occurred
             console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
             console.log('body:', body); // Print the HTML for the Google homepage.
             var jsonBody = JSON.parse(body)
             var deg = jsonBody.main.temp - 273.15
         convo.say('The weather in ' + city + ' is ' + jsonBody.weather[0].main 
         + ' and the temperature is ' + Math.round(deg,2) + '\xB0C')
         convo.next();
    })
},{},'default');
});
})