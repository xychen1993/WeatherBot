const Bot = require('fb-local-chat-bot');
const express = require('express');
const bodyParser = require('body-parser')
const Promise = require('bluebird');
const getLocation = require('./nlp.js').getLocation;
const getTime = require('./nlp.js').getTime;
const getResponse = require('./getWeatherData.js');

const PostBackTypes = {
  TELL_JOKE: 'TELL_JOKE',
  TELL_ANOTHER_JOKE: 'TELL_ANOTHER_JOKE',
};



// initialize Bot and define event handlers
Bot.init('<TOKEN>', '<VERIFY_TOKEN>', true /*useLocalChat*/, false /*useMessenger*/);

Bot.on('text', (event) => {
  const senderID = event.sender.id;
  const text = event.message.text;
  // Bot.sendText(senderID, "Location:" + getLocation(text));
  // Bot.sendText(senderID, "Time:" + getTime(text));
  var location = getLocation(text);
  var time = getTime(text);
  //Bot.sendText(senderID, location + " " + time);
  weatherResponse(time,location,senderID);
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





const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/chat', Bot.router());

var server = app.listen(5000);
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