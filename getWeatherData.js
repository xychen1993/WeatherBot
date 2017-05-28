http = require('http');
fs = require('fs');

var apiKey = 'fe61775117564a6d8d505610172004'

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

exports.forecastWeather = function(query, left, right,callback, errorcallback){
	var newQuery = "";
	if(query.toString().indexOf(' ') >= 0){
		var arr = query.toString().split(' ');
		newQuery = arr[0] + '_' + arr[1];
	}
	else
		newQuery = query;
	options.path = '/v1/forecast.json?key=' + apiKey + '&q=' + newQuery + '&days=' + right;
	var str = '';
	var result = '';

	var forecastday = parseInt(left);

	if(left == right)
		forecastday = forecastday-1;

	http.request(options, (res) => {
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => {
	  	str += chunk;
	  });
	  res.on('end', (chunk) => {
	  	forecast = JSON.parse(str);

        // console.log("forecast.forecast.forecastday.slice(left).length:", forecast.forecast.forecastday.slice(left).length)
        // console.log("forecast.forecast.forecastday.length:", forecast.forecast.forecastday.length)

        if (!forecast || !forecast.location || !forecast.location.name){
        	errorcallback("unexpected callback from api");
        	return;
        }

	  	result = {
            location: forecast.location.name,
            date: forecast.forecast.forecastday[forecastday].date,
            temp_f: forecast.forecast.forecastday[forecastday].day.avgtemp_f,
            temp_c: forecast.forecast.forecastday[forecastday].day.avgtemp_c,
            condition: forecast.forecast.forecastday[forecastday].day.condition.text,
            forecastday: forecastday,
            extra: forecast.forecast.forecastday.slice(left)
        }

        // console.log(result);

        console.log("in getWeatherData.forecastWeather with multiday left right: " + left + " " + right);
        callback(result);
	  });
	}).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        errorcallback(err);
    }).end();
}

exports.forecastHourlyWeather = function(hour, query, noOfDays, callback){
	// Find the hour
	var reg = /[0-9]+/gi;
	var regex = /[ap]m/gi;
	var am_pm = hour.toString().match(regex);
	var forecasthour = "";
	if(am_pm == "am")
		forecasthour = parseInt(hour.toString().match(reg));
	else
		forecasthour = parseInt(hour.toString().match(reg)) + 12;
	// Handle multi-word city names
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

	  	var date_n_time = forecast.forecast.forecastday[forecastday].hour[forecasthour].time;


	  	result = {
            location: forecast.location.name,
            date: date_n_time.toString().split(" ")[0],
            time: date_n_time.toString().split(" ")[1],
            temp_c: forecast.forecast.forecastday[forecastday].hour[forecasthour].temp_c,
            temp_f: forecast.forecast.forecastday[forecastday].hour[forecasthour].temp_f,
            condition: forecast.forecast.forecastday[forecastday].hour[forecasthour].condition.text,
            forecastday: forecastday,
            forecasthour: forecasthour
        }
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

	var more_days = 0;
	if(day.toString().includes(" ")){
		var str = day.toString().split(" ");
		day = str[0];
		more_days = parseInt(str[1]);
	}
	if(day == "now")
		return more_days;



	var now = new Date(); 

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
    // var now = new Date(); 

    if(nextDay > now.getDay()){
    	return nextDay - now.getDay() + more_days;
    }
    else{
    	return nextDay + 7 - now.getDay() + more_days;
    }
}

