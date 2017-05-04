const Bot = require('fb-local-chat-bot');
const express = require('express');
const bodyParser = require('body-parser')
const Promise = require('bluebird');
const getLocation = require('./nlp.js').getLocation;
const getCase = require('./nlp.js').getCase;
const getTime = require('./nlp.js').getTime;
const getResponse = require('./getWeatherData.js');

const cases = require('./cases.js').loadCases();

const token = process.env.PAGE_ACCESS_TOKEN;
const verify_token = process.env.VERIFY_TOKEN;

userCache = {};



const PostBackTypes = {
  TELL_JOKE: 'TELL_JOKE',
  TELL_ANOTHER_JOKE: 'TELL_ANOTHER_JOKE',
};



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
  if (!location && userCache[senderID]){location = userCache[senderID].location;}
  if (location){userCache[senderID] = {"location": location}}
	var time = getTime(text)
	weatherResponse(time,location,senderID)
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

Bot.on('postback', event => {
    const senderID = event.sender.id;
    console.log("event is ", event)
    console.log("payload is ", event.postback.payload)
    switch(event.postback.payload) {
      case PostBackTypes.TELL_JOKE:
        Bot.sendText(senderID, JOKE);
        Bot.sendButtons(
          senderID,
          'Ha. Ha. Ha. What else may I do for you?',
          [Bot.createPostbackButton('Tell me another joke', PostBackTypes.TELL_ANOTHER_JOKE)]
        );
        break;
      case PostBackTypes.TELL_ANOTHER_JOKE:
        Bot.sendText(senderID, 'Sorry, I only know one joke');
        break;

    }
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



function weatherResponse(time, location, senderID){
	if(location === -1){
  	// get the current location
  		if(time == 'now'){
  			getResponse.currentWeather('Evanston', (data) => {
  				Bot.sendText(senderID, data);
          Bot.sendButtons(
            senderID,
            'Some text',
            [
              Bot.createPostbackButton('How about tomorrow?', weatherResponse('tomorrow', location, senderID))
              
            ]);


  			});
  		}
  		else if(time == 'tomorrow'){ // specific location future weather
  			getResponse.forecastWeather('Evanston','2',(data) => {
  				//console.log(data);
  				Bot.sendText(senderID, data);
  			});
  		}
  	}
  	else{
  		if(time == 'now'){ //  specific location current weather
  			getResponse.currentWeather(location, (data) => {
  				Bot.sendText(senderID, data);
  			});
  		}
  		else if(time == 'tomorrow'){ // specific location future weather
  			getResponse.forecastWeather(location,'2',(data) => {
  			//console.log(data);
  				Bot.sendText(senderID, data);
  			});
  		}
  	}
}

