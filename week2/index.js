var Botkit = require('botkit')

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
    
    convo.addQuestion('Who are you going with?', function(response, convo){
        friend = response.text
        purpose = response.text
        bot.reply(message, 'Great! You are going with ' + friend + ' for ' + purpose + '. Enjoy your trip!')
        convo.next();
    },{},'default');
});
});
