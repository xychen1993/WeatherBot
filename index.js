// 'use strict'

// const express = require('express')
// const bodyParser = require('body-parser')
// const request = require('request')
// const app = express()

// app.set('port', (process.env.PORT || 5000))

// // Process application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: false}))

// // Process application/json
// app.use(bodyParser.json())

// // Index route
// app.get('/', function (req, res) {
// 	res.send('Hello world, I am a chat bot')
// })

// // for Facebook verification
// app.get('/webhook/', function (req, res) {
// 	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
// 		res.send(req.query['hub.challenge'])
// 	}
// 	res.send('Error, wrong token')
// })

// // Spin up the server
// app.listen(app.get('port'), function() {
// 	console.log('running on port', app.get('port'))
// })

// app.post('/webhook/', function (req, res) {
//     let messaging_events = req.body.entry[0].messaging
//     for (let i = 0; i < messaging_events.length; i++) {
// 	    let event = req.body.entry[0].messaging[i]
// 	    let sender = event.sender.id
// 	    if (event.message && event.message.text) {
// 		    let text = event.message.text
// 		    sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
// 	    }
//     }
//     res.sendStatus(200)
// })

// const token = "EAALiqKh4YCoBAO1GygPcb7k1sDt7ye1qJR8hJrI6htjwKoZAw5wsRfEJzCqsFNQzSJntPiIN79qZAOEQQgNoZCKiq8HvzmcmgXA8UTxXqEZCZAPMGaH0UtCEAcZAjKWsgzsZBQbLv4t4QfdV5HYv7AhIH7oZCiSruGGvIFeG2WANZAAZDZD";
// const verify_token = "my_voice_is_my_password_verify_me";

// function sendTextMessage(sender, text) {
//     let messageData = { text:text }
//     request({
// 	    url: 'https://graph.facebook.com/v2.6/me/messages',
// 	    qs: {access_token:token},
// 	    method: 'POST',
// 		json: {
// 		    recipient: {id:sender},
// 			message: messageData,
// 		}
// 	}, function(error, response, body) {
// 		if (error) {
// 		    console.log('Error sending messages: ', error)
// 		} else if (response.body.error) {
// 		    console.log('Error: ', response.body.error)
// 	    }
//     })
// }



const Bot = require('fb-local-chat-bot');
const express = require('express');
const bodyParser = require('body-parser')
const Promise = require('bluebird');
const getLocation = require('./nlp.js').getLocation;
const getCase = require('./nlp.js').getCase;
const cases = require('./cases.js').loadCases();

const token = "EAALiqKh4YCoBAO1GygPcb7k1sDt7ye1qJR8hJrI6htjwKoZAw5wsRfEJzCqsFNQzSJntPiIN79qZAOEQQgNoZCKiq8HvzmcmgXA8UTxXqEZCZAPMGaH0UtCEAcZAjKWsgzsZBQbLv4t4QfdV5HYv7AhIH7oZCiSruGGvIFeG2WANZAAZDZD";
const verify_token = "my_voice_is_my_password_verify_me";

// initialize Bot and define event handlers
Bot.init(token, verify_token, true /*useLocalChat*/, true /*useMessenger*/);

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

var server = app.listen((process.env.PORT || 5000));
return server;