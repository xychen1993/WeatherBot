const Bot = require('fb-local-chat-bot');
const express = require('express');
const bodyParser = require('body-parser')
const Promise = require('bluebird');
const getLocation = require('./nlp.js').getLocation;
const getCase = require('./nlp.js').getCase;
const getTime = require('./nlp.js').getTime;
const getResponse = require('./getWeatherData.js');

const heuristics = require('./heuristics.js');

const token = process.env.PAGE_ACCESS_TOKEN;
const verify_token = process.env.VERIFY_TOKEN;

userCache = {};

// initialize Bot and define event handlers
Bot.init(token, verify_token, true /*useLocalChat*/, true /*useMessenger*/);

// on text message
Bot.on('text', (event) => {
    // extract some parameters
    const senderID = event.sender.id;
    const text = event.message.text;
    console.log("\nreceived text message: " + text);

    if (bbseddit(text, senderID)){return};

    // get case
    var location = getLocation(text);
    console.log("location (pre-cache): " + location);
    if (!location && userCache[senderID]){location = userCache[senderID].location;} // read from cache
    if (location){userCache[senderID] = {"location": location}}                     // write to cache
    if (location == -1){location = "Evanston"}                                      // default to Evanston
    console.log("location (post-cache): " + location);

    var time = getTime(text)

    // get weather information
    weatherResponse(time, location, senderID, (weatherJSON) => {
        // use weather information to compose message
        activityMessageText = heuristics.applyActivityMessage(text,  weatherJSON);      // if suitable for activities
        weatherMessageText = weatherMessage(weatherJSON);                               // general report
        message = (activityMessageText === "") ? weatherMessageText : activityMessageText + " " + weatherMessageText;   // final message
        Bot.sendText(senderID, message);
    })
});

Bot.on('postback', event => {
    console.log("RECEIVED POSTBACK");
    console.log("event.postback.payload: \n" + JSON.stringify(event.postback.payload, null, 4));
    const senderID = event.sender.id;
    switch(event.postback.payload) {
        case "tomorrow":
            Bot.sendText(senderID, "nah, fuck off");
            break;
        default:
            console.log("postback case not found");
            Bot.sendText(senderID, "didn't catch that");
            
    // case PostBackTypes.TELL_JOKE:
    // Bot.sendText(senderID, JOKE);
    // Bot.sendButtons(
    // senderID,
    // 'Ha. Ha. Ha. What else may I do for you?',
    // [Bot.createPostbackButton('Tell me another joke', PostBackTypes.TELL_ANOTHER_JOKE)]
    // );
    // break;
    // case PostBackTypes.TELL_ANOTHER_JOKE:
    // Bot.sendText(senderID, 'Sorry, I only know one joke');
    break;

    }
});

function weatherMessage(weatherJSON){
    // weatherJSON.location
    // weatherJSON.date
    // weatherJSON.temp_f
    // weatherJSON.temp_c
    // weatherJSON.feelslike_f
    // weatherJSON.feelslike_c
    // weatherJSON.condition
    // weatherJSON.forecastday

    if (weatherJSON.date == "NOW"){
        message = "The weather now in " + weatherJSON.location + " is " + weatherJSON.temp_c + " C/ " 
                + weatherJSON.temp_f + " F. It is \'" + weatherJSON.condition + "\'. Real feel: " 
                + weatherJSON.feelslike_c + " C/ " + weatherJSON.feelslike_f + "F.";
    } else if(weatherJSON.forecasthour){
        equalityWord = (weatherJSON.forecastday === 0) ? "is" : "will be";
        message = "The weather in " + weatherJSON.location + " of date: " + weatherJSON.date + " at " + weatherJSON.time + " " 
                + equalityWord + " " + weatherJSON.temp_c + " C/" + weatherJSON.temp_f + " F. It "
                + equalityWord + " \'" + weatherJSON.condition + "\'.";
    }
    else {
        equalityWord = (weatherJSON.forecastday === 0) ? "is" : "will be";
        message = "The weather in " + weatherJSON.location + " of date: " + weatherJSON.date + " "
                + equalityWord + " " + weatherJSON.temp_c + " C/" + weatherJSON.temp_f + " F. It "
                + equalityWord + " \'" + weatherJSON.condition + "\'.";
    }

    return message;
}

function weatherResponse(time, location, senderID, callback){
    forecastDay = getForecastDay(time.day);
    console.log("Forecast of " + forecastDay + " days.");
    if(time.hour){
        getResponse.forecastHourlyWeather(time.hour, location,forecastDay.toString(), (weatherJSON) => {
                console.log("weatherJSON: \n" + JSON.stringify(weatherJSON, null, 4));
                callback(weatherJSON);
            });
    }
    else{
         // location === -1 case is handled at Bot.on("text") scope
        if (forecastDay === 1){
            getResponse.currentWeather(location, (weatherJSON) => {
                console.log("weatherJSON: \n" + JSON.stringify(weatherJSON, null, 4));
                callback(weatherJSON);
            });
        } else {
            getResponse.forecastWeather(location,forecastDay.toString(), (weatherJSON) => {
                console.log("weatherJSON: \n" + JSON.stringify(weatherJSON, null, 4));
                callback(weatherJSON);
            });
        }
    }       
    // // location === -1 case is handled at Bot.on("text") scope
    // if (forecastDay === 1){
    //     getResponse.currentWeather(location, (weatherJSON) => {
    //         console.log("weatherJSON: \n" + JSON.stringify(weatherJSON, null, 4));
    //         callback(weatherJSON);
    //     });
    // } else {
    //     getResponse.forecastWeather(location,forecastDay.toString(), (weatherJSON) => {
    //         console.log("weatherJSON: \n" + JSON.stringify(weatherJSON, null, 4));
    //         callback(weatherJSON);
    //     });
    // }

    // functions ------------------------------
    function getForecastDay(time){
        var forecastDay = 1;
        if (time == "now"){
            forecastDay = 1;
        }
        else if (time == "tomorrow"){
            forecastDay = 2;
        }
        else if (time != "tomorrow"){
            forecastDay = getResponse.countDay(time) +1;
        } 
        return forecastDay;      
    }
}

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

function bbseddit(text, senderID){
    text = text.toUpperCase();
    matches = [
        "do you get what I'm saying here",
        "namsayin",
        "am I making sense here",
        "am I making sense"
    ];
    responses = ["no", "not really", "uhh"];
    for (var i=0; i<matches.length; i++){
        if (text.includes(matches[i].toUpperCase())){
            Bot.sendText(senderID, responses[Math.floor(Math.random() * responses.length)]);
            return true;    
        }
    }
    return false;
}
