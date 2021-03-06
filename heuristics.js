const getResponse = require('./getWeatherData.js');


// all_weather_conditions
// [
// 		"sunny",
// 		"cloudy",
// 		"windy",
// 		"rainy",
// 		"stormy",
// 		"foggy",
// 		"snowy",
// 		"lightning",
// 		"hail",
// 		"tornado",
// 		"hurricane",
// 		"flood",
// 		"tsunami",
// 		"forest",
// 		"fire",
// 		"rainbow",
// 		"hot",
// 		"cold"
// 	]
picky = {
    "Sunny": false,
    "Cloudy": true,
    "Partly Cloudy": true,
    "Mist": true,
    "Overcast": true,
    "Patchy rain nearby": true,
    "Patchy snow nearby": true,
    "Patchy sleet nearby": true,
    "Patchy freezing drizzle nearby": true,
    "Thundery outbreaks in nearby": true,
    "Blowing snow": true,
    "Blizzard": true,
    "Fog": true,
    "Freezing fog": true,
    "Patchy light drizzle": true,
    "Light drizzle": true,
    "Freezing drizzle": true,
    "Heavy freezing drizzle": true,
    "Patchy light rain": true,
    "Light rain": true,
    "Moderate rain at times": true,
    "Moderate rain": true,
    "Heavy rain at times": true,
    "Heavy rain": true,
    "Light freezing rain": true,
    "Moderate or heavy freezing rain": true,
    "Light sleet": true,
    "Moderate or heavy sleet": true,
    "Patchy light snow": true,
    "Light snow": true,
    "Patchy moderate snow": true,
    "Moderate snow": true,
    "Patchy heavy snow": true,
    "Heavy snow": true,
    "Ice pellets": true,
    "Light rain shower": true,
    "Moderate or heavy rain shower": true,
    "Torrential rain shower": true,
    "Light sleet showers": true,
    "Moderate or heavy sleet showers": true,
    "Light snow showers": true,
    "Moderate or heavy snow showers": true,
    "Light showers of ice pellets": true,
    "Moderate or heavy showers of ice pellets": true,
    "Patchy light rain in area with thunder": true,
    "Moderate or heavy rain in area with thunder": true,
    "Patchy light snow in area with thunder": true,
    "Moderate or heavy snow in area with thunder": true
}

moderate = {
    "Sunny": false,
    "Cloudy": false,
    "Partly Cloudy": false,
    "Mist": true,
    "Overcast": true,
    "Patchy rain nearby": false,
    "Patchy snow nearby": false,
    "Patchy sleet nearby": false,
    "Patchy freezing drizzle nearby": true,
    "Thundery outbreaks in nearby": true,
    "Blowing snow": true,
    "Blizzard": true,
    "Fog": true,
    "Freezing fog": true,
    "Patchy light drizzle": true,
    "Light drizzle": true,
    "Freezing drizzle": true,
    "Heavy freezing drizzle": true,
    "Patchy light rain": true,
    "Light rain": true,
    "Moderate rain at times": true,
    "Moderate rain": true,
    "Heavy rain at times": true,
    "Heavy rain": true,
    "Light freezing rain": true,
    "Moderate or heavy freezing rain": true,
    "Light sleet": true,
    "Moderate or heavy sleet": true,
    "Patchy light snow": true,
    "Light snow": true,
    "Patchy moderate snow": true,
    "Moderate snow": true,
    "Patchy heavy snow": true,
    "Heavy snow": true,
    "Ice pellets": true,
    "Light rain shower": true,
    "Moderate or heavy rain shower": true,
    "Torrential rain shower": true,
    "Light sleet showers": true,
    "Moderate or heavy sleet showers": true,
    "Light snow showers": true,
    "Moderate or heavy snow showers": true,
    "Light showers of ice pellets": true,
    "Moderate or heavy showers of ice pellets": true,
    "Patchy light rain in area with thunder": true,
    "Moderate or heavy rain in area with thunder": true,
    "Patchy light snow in area with thunder": true,
    "Moderate or heavy snow in area with thunder": true
}

warrior = {
    "Sunny": false,
    "Cloudy": false,
    "Partly Cloudy": false,
    "Mist": false,
    "Overcast": false,
    "Patchy rain nearby": false,
    "Patchy snow nearby": false,
    "Patchy sleet nearby": false,
    "Patchy freezing drizzle nearby": false,
    "Thundery outbreaks in nearby": false,
    "Blowing snow": true,
    "Blizzard": true,
    "Fog": true,
    "Freezing fog": true,
    "Patchy light drizzle": false,
    "Light drizzle": false,
    "Freezing drizzle": true,
    "Heavy freezing drizzle": true,
    "Patchy light rain": true,
    "Light rain": false,
    "Moderate rain at times": false,
    "Moderate rain": false,
    "Heavy rain at times": true,
    "Heavy rain": true,
    "Light freezing rain": true,
    "Moderate or heavy freezing rain": true,
    "Light sleet": true,
    "Moderate or heavy sleet": true,
    "Patchy light snow": true,
    "Light snow": true,
    "Patchy moderate snow": true,
    "Moderate snow": true,
    "Patchy heavy snow": true,
    "Heavy snow": true,
    "Ice pellets": true,
    "Light rain shower": true,
    "Moderate or heavy rain shower": true,
    "Torrential rain shower": true,
    "Light sleet showers": true,
    "Moderate or heavy sleet showers": true,
    "Light snow showers": true,
    "Moderate or heavy snow showers": true,
    "Light showers of ice pellets": true,
    "Moderate or heavy showers of ice pellets": true,
    "Patchy light rain in area with thunder": true,
    "Moderate or heavy rain in area with thunder": true,
    "Patchy light snow in area with thunder": true,
    "Moderate or heavy snow in area with thunder": true
}

activities = {
    "basketball": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "basket ball": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "base ball": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "baseball": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "golf": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "golfing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "volleyball": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "ping pong": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "ride": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": moderate
    },
    "cycling": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": moderate
    },
    "bicycling": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": moderate
    },
    "walk": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": moderate
    },
    "Trekking": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Wildlife safari": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Snorkeling": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Angling/fly fishing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Gliding": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Camel safari": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Amusement park": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Indigenous culture": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Rock climbing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Camping": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Scuba diving": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Canyoning": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Ballooning": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Desert Jeep safari": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Safari park": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Mountain biking": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Birdwatching": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Parasailing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Whitewater rafting": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Flying": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Sandboarding": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Off-leash dog park": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Metal detecting": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Motorbike expedition": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Elephant safari": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Sport fishing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Water sports": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Paramotoring": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Bungee jumping": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Benchmarking": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Skiing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Tree climbing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Windsurfing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Kayaking": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Skydiving": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Picnicking": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Sightseeing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Snowboarding": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Adventure park": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Canoeing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Paragliding": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Corn maze": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Snowshoeing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Mushroom hunting": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Clam digging": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Waterskiing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Wingsuit flying": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Ice climbing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Running": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Jetskiing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Mountain climbing": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "Swimming": {
        "temp_range_low": 60,
        "temp_range_high": 83,
        "agnostic_weather_conditions": picky
    },
    "badthing": {
        "temp_range_low": 1000,
        "temp_range_high": 1001,
        "agnostic_weather_conditions": picky
    },
    "goodthing": {
        "temp_range_low": -90,
        "temp_range_high": 1001,
        "agnostic_weather_conditions": warrior
    }
}

exports.applyActivityMessage = function (query, activitiesCache, senderID, weatherJSON, callback){
    // returns empty string if none applicable
    // returns reason not to if something applies
    message = "";
    relevant_activities = findActivities(query);

    console.log("found " + String(relevant_activities.length) + " activities");
    console.log(JSON.stringify(relevant_activities));

    if (relevant_activities.length === 0 && activitiesCache[senderID]){
        if (query.toLowerCase().includes("about")){
            relevant_activities = activitiesCache[senderID];
            console.log("loaded activities from cache, activities are now:");
            console.log(JSON.stringify(relevant_activities));
        } else {
            activitiesCache[senderID] = relevant_activities;
            console.log("destroyed activitesCache for user", senderID);
        }
    }

    shouldGo = true;
    for (var i=0; i<relevant_activities.length; i++){
        if (!shouldGo){continue}
        activity = relevant_activities[i];
        info = activities[activity];

        console.log("weatherJSON.temp_f: ", weatherJSON.temp_f)
        console.log("info.temp_range_low: ", info.temp_range_low)
        console.log("info.temp_range_high: ", info.temp_range_high)

        response = getIfShouldGo(weatherJSON, info);
        message += response.message + ".";
        shouldGo = response.shouldGo;

        if (!shouldGo){
            console.log("message is: " +message);
            message = "It may not be good weather for " + activity.toLowerCase() + "" + message;
            location = weatherJSON.location;
            getResponse.forecastWeather(location, 0, 9, (newWeatherJSON)=>{
                for (var dayi=0; dayi<newWeatherJSON.extra.length; dayi++){
                    day = newWeatherJSON.extra[dayi];
                    for (var houri=0; houri<day.hour.length; houri++){
                        hour = day.hour[houri];
                        queryWeatherJSON = {
                            temp_f: hour.temp_f,
                            temp_c: hour.temp_c,
                            condition: hour.condition.text
                        };
                        if (getIfShouldGo(queryWeatherJSON, info).shouldGo){
                            message += " It will be better to go "
                            message += (dayi === 0) ? "today" : "in " + String(dayi) + " days"
                            message += " at " + String(houri) + ":00, when it will be " 
                            message += hour.temp_f + " and " + hour.condition.text + " out."
                            callback(message);
                            return;
                        };
                    }
                }
                // console.log(JSON.stringify(weatherJSON, null, 4));
                callback(message);
                return;
            }, (error)=>{
                console.log("error in applyActivityMessage in if !shouldgo blah blah blah"); 
            });
            return;
        }
    }

    if (relevant_activities.length > 0 && shouldGo){
        message = "It will be good weather for " + activity.toLowerCase() + message;
    }

    callback(message);
    return;

    function getIfShouldGo(weatherJSON, info){
        ans = {
            message: "",
            shouldGo: true
        };
        if (Number(weatherJSON.temp_f) < info.temp_range_low){
            ans.message += " (it will be too cold)"
            ans.shouldGo = false;
            return ans;
        } else if (Number(weatherJSON.temp_f) > info.temp_range_high){
            ans.message += " (it will be too hot)"
            ans.shouldGo = false;
            return ans;
        }

        for (condition in info.agnostic_weather_conditions){
            if (info.agnostic_weather_conditions.hasOwnProperty(condition)) {
                if (info.agnostic_weather_conditions[condition]){
                    if (weatherJSON.condition.toUpperCase().includes(condition.toUpperCase())){
                        ans.message += " (it is " + condition.toLowerCase() + ")";
                        ans.shouldGo = false;
                        return ans;
                    }
                }
            }
        }
        return ans;
    }
}

exports.loadActivities = function(){return activities}

exports.setActivityCache = function(query, senderID, activityCache){
    activity = findActivities(query);

    // read from cache
    if (activity.length == 0 && activityCache[senderID]){
        activity = activityCache[senderID];
    }

    // write to cache
    if (activity){
        activityCache[senderID] = activity
    }

    return activityCache;
}

function findActivities(query){
    // returns array of activities
    // returns empty array if none applicable
    query = query.toUpperCase();
    relevant_activities = [];
    for (var activity in activities) {
        if (activities.hasOwnProperty(activity)) {
            if (query.includes(activity.toUpperCase())){
                relevant_activities.push(activity);
            }
        }
    }
    return relevant_activities
}