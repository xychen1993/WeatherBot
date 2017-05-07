http = require('http');
fs = require('fs');

var apiKey = 'cacdf29dc2be47d484a105606152306'

var options = {
  host: 'api.apixu.com',
  port: 80,
  path: '/v1/current.json?key=' + apiKey + '&q=',
  method: 'GET'
};

exports.currentWeather = function(query, callback){
	// var location = query;
	// location = location.replace(/\s+/g, '_');
	// console.log(query);
	options.path = '/v1/current.json?key=' + apiKey + '&q=' + query;
	var str = '';
	var result = '';
	http.request(options, (res) => {
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => {
	  	str += chunk;
	  });
	  res.on('end', (chunk) => {
	  	current = JSON.parse(str);
	  	//console.log("The weather now in " + current.location.name +" is: "+ current.current.temp_c + " C/ " + current.current.temp_f + " F.");
	  	result += "The weather now in " + current.location.name +" is: "+ current.current.temp_c + " C/ " 
	  				+ current.current.temp_f + " F. It is \'" + current.current.condition.text + "\'. Real feel: " 
	  				+ current.current.feelslike_c + " C/ " + current.current.feelslike_f + "F."
	  	callback(result);
	  });
	}).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        callback(err);
    }).end();
}

exports.forecastWeather = function(query, noOfDays, callback){
	options.path = '/v1/forecast.json?key=' + apiKey + '&q=' + query + '&days=' + noOfDays;
	var str = '';
	var result = '';

	var forecastday = parseInt(noOfDays) - 1;

	http.request(options, (res) => {
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => {
	  	str += chunk;
	  });
	  res.on('end', (chunk) => {
	  	forecast = JSON.parse(str);
	  	if(forecastday == 0){
	  		result += "The weather in " + forecast.location.name + " of date: " 
	  			+ forecast.forecast.forecastday[forecastday].date + " is " + forecast.forecast.forecastday[forecastday].day.avgtemp_c 
	  			+ " C/" + forecast.forecast.forecastday[forecastday].day.avgtemp_f + " F. It is \'" + forecast.forecast.forecastday[forecastday].day.condition.text
	  			+ "\'.";
	  	}
	  	else{
			result += "The weather in " + forecast.location.name + " of date: " 
	  			+ forecast.forecast.forecastday[forecastday].date + " will be " + forecast.forecast.forecastday[forecastday].day.avgtemp_c 
	  			+ " C/" + forecast.forecast.forecastday[forecastday].day.avgtemp_f + " F. It will be \'" + forecast.forecast.forecastday[forecastday].day.condition.text
	  			+ "\'.";	  	}
	  	// location + date(tomorrow) + average temperature
	  	callback(result);
	  });
	}).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        callback(err);
    }).end();
}


errorHandler = function (){
	console.log('got some error')
}
	
exports.countDay = function(day){
	//console.log(day.toString());
	if(day.toString().includes("next"))
		console.log(day.toString());
	var nextDay = 0;
	switch(day.toString()){
		case "monday":
			nextDay = 1;
			break;
		case "tuesday":
			nextDay = 2;
			break;
		case "wednesday":
			nextDay = 3;
			break;
		case "thursday":
			nextDay = 4;
			break;
		case "friday":
			nextDay = 5;
			break;
		case "saturday":
			nextDay = 6;
			break;
		case "sunday":
			nextDay = 7;
			break;
	}
	//console.log(nextDay);
    var now = new Date(); 

    if(nextDay > now.getDay()){
    	return nextDay - now.getDay();
    }
    else{
    	return nextDay + 7 - now.getDay();
    }
}

