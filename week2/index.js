var Botkit = require('botkit')

if(!process.env.token){
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var controller = BOtkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.token
}).startRTM(function(err){
    if(err){
        throw new Error(err);
    }
});

controller.hears(
    ['hi','hello','howdy'], 'direct_message,direct_mention',
function(bot, message){
    bot.reply(message, 'Hello there! :wave:');
});