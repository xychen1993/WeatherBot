const Bot = require('fb-local-chat-bot');
const express = require('express');
const bodyParser = require('body-parser')
const Promise = require('bluebird');
const getLocation = require('./nlp.js').getLocation;
const getCase = require('./nlp.js').getCase;
const cases = require('./cases.js').loadCases();

const token = process.env.PAGE_ACCESS_TOKEN;
const verify_token = process.env.VERIFY_TOKEN;

// initialize Bot and define event handlers
Bot.init(token, verify_token, true /*useLocalChat*/, true /*useMessenger*/);

// on text message
Bot.on('text', (event) => {
	// extract some parameters
	const senderID = event.sender.id;
	const text = event.message.text;
	console.log("\nreceived text message: " + text);

	// Bot.sendText(senderID, "Ow! Splidao!");

	// get case
	var location = getLocation(text);
	var caseNode = getCase(text);
	console.log("message is of case: " + caseNode);

	// perform action
	messageBody = cases[caseNode].action({
		location: location
	});

	// send message
	console.log("sending message: " + messageBody);
	Bot.sendText(senderID, messageBody);
});


// deploy server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// /webhook for fb and /webhook/localChat/ for local chat
app.use('/webhook', Bot.router());

// /* for checking if online
app.get('/', function (req, res) {
	res.send('WeatherBot is online')
})

// start server
var server = app.listen((process.env.PORT || 5000), (err)=>{
	if (err){
		console.log("failed starting server...");	
	}
	console.log("process.env.PORT is " + String(process.env.PORT));
	console.log("now running on port " + String(process.env.PORT || 5000));
});
return server;