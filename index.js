const Bot = require('fb-local-chat-bot');
const express = require('express');
const bodyParser = require('body-parser')
const Promise = require('bluebird');
const getLocation = require('./nlp.js').getLocation;
const getCase = require('./nlp.js').getCase;
const cases = require('./cases.js').loadCases();

// initialize Bot and define event handlers
Bot.init('<TOKEN>', '<VERIFY_TOKEN>', true /*useLocalChat*/, false /*useMessenger*/);

Bot.on('text', (event) => {
	// extract some parameters
	const senderID = event.sender.id;
	const text = event.message.text;

	// get case
	var location = getLocation(text);
	var caseNode = getCase(text);
	// perform action
	messageBody = cases[caseNode].action();

	// send message
	Bot.sendText(senderID, "Location: " + JSON.stringify(location, null, 4));
	Bot.sendText(senderID, "case: " + caseNode);
	Bot.sendText(senderID, "messageBody: " + messageBody);


});


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/chat', Bot.router());

var server = app.listen((process.env.PORT || 8080));
return server;


// Bot.on('text', async (event: object) => {
//   // do something
// });

// Bot.on('attachments', async (event: object) => {
//   // do something
// });

// Bot.on('postback', async (event: object) => {
//   // do something
// });

// app.use('/webhook', Bot.router());
// // go to http://localhost:5000/webhook/localChat/ for local chat debugging
