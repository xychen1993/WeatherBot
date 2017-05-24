const Bot = require('fb-local-chat-bot');
const express = require('express');
const bodyParser = require('body-parser')
const Promise = require('bluebird');
const getLocation = require('./nlp.js').getLocation;
const getCase = require('./nlp.js').getCase;
const getTime = require('./nlp.js').getTime;
const getIfDisasterCase = require('./nlp.js').getIfDisasterCase;
const getResponse = require('./getWeatherData.js');
const getDisaster = require('./disaster.js').getDisaster;
const heuristics = require('./heuristics.js');

const token = process.env.PAGE_ACCESS_TOKEN;
const verify_token = process.env.VERIFY_TOKEN;
var linkedNews;

const PostBackTypes = {
 GET_NEWS:'GET_NEWS'
};

locationCache = {};
activityCache = {};

// initialize Bot and define event handlers
Bot.init(token, verify_token, true /*useLocalChat*/, false /*useMessenger*/);

// on text message
Bot.on('text', (event) => {
    // extract some parameters
    const senderID = event.sender.id;
    const text = event.message.text;
    console.log("\nreceived text message: " + text);

    // get case
    var location = getLocation(text);
    console.log("location (pre-cache): " + location);
    if (!location && locationCache[senderID]){location = locationCache[senderID].location;}     // read from cache
    if (location){locationCache[senderID] = {"location": location}}                             // write to cache
    if (location == -1){location = "Evanston"}                                                  // default to Evanston
    console.log("location (post-cache): " + location);

    var time = getTime(text)

    if (bbseddit(text)){
        message = sayyit();
        Bot.sendText(senderID, message);
    } else if (getIfDisasterCase(text)) {
        // disaster case
        console.log("in disaster case");
        getDisaster(location, function(disasterJSON){
            message = disasterMessage(location, disasterJSON);
            console.log("message:",message);
            if (message == "No disaters in the past month") {
                Bot.sendText(senderID, message);

            } else {
                console.log("disaters link is ", linkedNews);
                Bot.sendButtons(
                      senderID,
                      message,
                      [
                        Bot.createPostbackButton('Open website for disaters', PostBackTypes.GET_NEWS)
                      ]
                    );
            }
            
        }, (errorBody) => {
            message = "error trying to find disaster info:\n";
            message += JSON.stringify(errorBody, null, 4);
            Bot.sendText(senderID, message);
        });
    } else {
        // weather/activity case
        // if (time.day_number){
        if (time.day_number >= 10){
            Bot.sendText(senderID, "Sorry, I don't know the weather for soo many days in the future. Try to ask for any number less than 10.");
            return;
        } 
        // else {
        //         // console.log("Days of forecast in INDEX " + time.day_number);
        //         for (var i = 0; i < time.day_number; i++){
        //             if (i != 0){
        //                 time.day = time.day.toString().substring(0, time.day.toString().length-2) + " " + i;
        //             } else {
        //                 time.day = time.day + " " + i;
        //             }
        //             // console.log(time.day);
        //         }
        //     }
        // }

        weatherResponse(time, location, senderID, time.day_number,(weatherJSON) => {
            if (!weatherJSON || !weatherJSON.location){
                console.log("ERROR: weatherResponse gave back unexpected object at scope Bot.on(test)");
                Bot.sendText(senderID, "my api just failed...");
                return;
            }
            // use weather information to compose message
            activityCache = heuristics.setActivityCache(text, senderID, activityCache);
            activityMessageText = heuristics.applyActivityMessage(text, activityCache, senderID, weatherJSON);      // if suitable for activities
            weatherMessageText = weatherMessage(weatherJSON);                               // general report
            message = (activityMessageText === "") ? weatherMessageText : activityMessageText + " " + weatherMessageText;   // final message
            Bot.sendText(senderID, message);
        })
    } 
});

Bot.on('postback', event => {
    console.log("RECEIVED POSTBACK");
    console.log("event.postback.payload: \n" + JSON.stringify(event.postback.payload, null, 4));
    const senderID = event.sender.id;
    switch(event.postback.payload) {
        case "tomorrow":
            Bot.sendText(senderID, "nah, fuck off");
            break;
        case PostBackTypes.GET_NEWS:
            Bot.sendText(senderID, 'http://www.news.google.com/news/section?q=Fire+Lee');
            break;
        default:
            console.log("postback case not found");
            Bot.sendText(senderID, "didn't catch that");
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
    if (!weatherJSON.date){
        message = weatherJSON;
    } else if (weatherJSON.date == "NOW"){
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

function weatherResponse(time, location, senderID, day_number, callback){
    forecastDay = getForecastDay(time.day);
    console.log("Forecast of " + parseInt(day_number) + " days. Starting from " + forecastDay + " to " + day_number);
    if(forecastDay > 10){
        callback("Sorry, I don't know the weather for the " + forecastDay + "th day in the future.");
        return;
    }
    if(time.hour){
        getResponse.forecastHourlyWeather(time.hour, location,forecastDay.toString(), (weatherJSON) => {
            console.log("weatherJSON in weatherresponse: time.hour: \n" + JSON.stringify(weatherJSON, null, 4));
            callback(weatherJSON);
        });
    }
    else{
         // location === -1 case is handled at Bot.on("text") scope
        if (forecastDay === 1 && (!day_number || day_number == 0)){
            getResponse.currentWeather(location, (weatherJSON) => {
                console.log("weatherJSON in weatherresponse: forecastday1: \n" + JSON.stringify(weatherJSON, null, 4));
                callback(weatherJSON);
            });
        } else {
            getResponse.forecastWeather(location, forecastDay.toString(), day_number,(weatherJSON) => {
                console.log("weatherJSON in weatherresponse: else: ");
                callback(weatherJSON);
            }, (error) => {
                console.log("ERROR: weatherJSON in weatherresponse: else, and got an error!");
                callback({});
            });
        }
    }       

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

function disasterMessage(city, disasterJSON){
    console.log("city,", city);
    cityInEnglish = city[0].charAt(0).toUpperCase() + city[0].slice(1);
    message = "";
    if (!disasterJSON) {
        message = "No Information";
    } else {

        var newDate = new Date()
        newDate.setMonth(newDate.getMonth() - 1);
        console.log("seven days: ",newDate)
        if (disasterJSON.incidentEndDate < newDate.toJSON()) {
            message = "No disaters in the past month"


        }else {
            message = "Latest Disater Information Near "+ cityInEnglish +", " + disasterJSON.state + ": ";
            message += " Title: "  + disasterJSON.title + ". ";
            message += " Incident Type: " + disasterJSON.incidentType + ". ";
            message += " County Area: " + disasterJSON.declaredCountyArea + ". ";
            message += " Begin Date: " + disasterJSON.incidentBeginDate + ". ";
            message += " End Date: " + disasterJSON.incidentEndDate + ". ";
            linkedNews = "http://www.news.google.com/news/section?q=" + disasterJSON.incidentType + "+" + disasterJSON.declaredCountyArea.split(" ")[0];
            console.log("linked URL is ", linkedNews)

        }
        
    }
    return message;
}

// deploy server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// webhook for fb and /webhook/localChat/ for local chat
app.use('/webhook', Bot.router());

// for checking if online
app.get('/', function (req, res) {
    res.send('WeatherBot is online');
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

function bbseddit(text){
    text = text.toUpperCase();
    matches = [
        'sayin',
        'here',
        "making sense",
        "am i"
    ];
    for (var i=0; i<matches.length; i++){
        if (text.includes(matches[i].toUpperCase())){
            return true;    
        }
    }
    return false;
}

function sayyit(){
    responses = ["no", "not really", "uhh", "lol", "tbh not really", ":')"];
    return responses[Math.floor(Math.random() * responses.length)];
}