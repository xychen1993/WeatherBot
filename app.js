const Bot = require('fb-local-chat-bot');
const express = require('express');
const bodyParser = require('body-parser')
const Promise = require('bluebird');
const getLocation = require('./nlp.js').getLocation;
const getTime = require('./nlp.js').getTime;


// initialize Bot and define event handlers
Bot.init('<TOKEN>', '<VERIFY_TOKEN>', true /*useLocalChat*/, false /*useMessenger*/);

Bot.on('text', (event) => {
  const senderID = event.sender.id;
  const text = event.message.text;
  Bot.sendText(senderID, "Location:" + getLocation(text));
  Bot.sendText(senderID, "Time:" + getTime(text));

});


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/chat', Bot.router());

var server = app.listen(5000);
return server;

