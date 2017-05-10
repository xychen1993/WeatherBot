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
	var newQuery = "";
	if(query.toString().indexOf(' ') >= 0){
		var arr = query.toString().split(' ');
		newQuery = arr[0] + '_' + arr[1];
	}
	else
		newQuery = query;
	options.path = '/v1/current.json?key=' + apiKey + '&q=' + newQuery;
	var str = '';
	var result = '';
	http.request(options, (res) => {
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => {
	  	str += chunk;
	  });
	  res.on('end', (chunk) => {
	  	current = JSON.parse(str);
	  	result = {
            location: current.location.name,
            date: "NOW",
            temp_f: current.current.temp_f,
            temp_c: current.current.temp_c,
            feelslike_f: current.current.feelslike_f,
            feelslike_c: current.current.feelslike_c,
            condition: current.current.condition.text,
            forecastday: -1
        }



	  	//console.log("The weather now in " + current.location.name +" is: "+ current.current.temp_c + " C/ " + current.current.temp_f + " F.");
	  	// result += "The weather now in " + current.location.name +" is: "+ current.current.temp_c + " C/ " 
	  	// 			+ current.current.temp_f + " F. It is \'" + current.current.condition.text + "\'. Real feel: " 
	  	// 			+ current.current.feelslike_c + " C/ " + current.current.feelslike_f + "F."
	  	callback(result);
	  });
	}).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        callback(err);
    }).end();
}

exports.forecastWeather = function(query, noOfDays, callback){
	var newQuery = "";
	if(query.toString().indexOf(' ') >= 0){
		var arr = query.toString().split(' ');
		newQuery = arr[0] + '_' + arr[1];
	}
	else
		newQuery = query;
	options.path = '/v1/forecast.json?key=' + apiKey + '&q=' + newQuery + '&days=' + noOfDays;
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

	  	result = {
            location: forecast.location.name,
            date: forecast.forecast.forecastday[forecastday].date,
            temp_f: forecast.forecast.forecastday[forecastday].day.avgtemp_f,
            temp_c: forecast.forecast.forecastday[forecastday].day.avgtemp_c,
            condition: forecast.forecast.forecastday[forecastday].day.condition.text,
            forecastday: forecastday
        }

	  // 	if(forecastday == 0){
	  // 		result += "The weather in " + forecast.location.name + " of date: " 
	  // 			+ forecast.forecast.forecastday[forecastday].date + " is " + forecast.forecast.forecastday[forecastday].day.avgtemp_c 
	  // 			+ " C/" + forecast.forecast.forecastday[forecastday].day.avgtemp_f + " F. It is \'" + forecast.forecast.forecastday[forecastday].day.condition.text
	  // 			+ "\'.";
	  // 	}
	  // 	else{
			// result += "The weather in " + forecast.location.name + " of date: " 
	  // 			+ forecast.forecast.forecastday[forecastday].date + " will be " + forecast.forecast.forecastday[forecastday].day.avgtemp_c 
	  // 			+ " C/" + forecast.forecast.forecastday[forecastday].day.avgtemp_f + " F. It will be \'" + forecast.forecast.forecastday[forecastday].day.condition.text
	  // 			+ "\'.";	  	}
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
	if(day.toString().includes("next")){
		var str = day.toString().split(" ");
		day = str[1];
	}
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

