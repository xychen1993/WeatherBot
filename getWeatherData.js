http = require('http');
fs = require('fs');

// exports.getResponse = function(location, time, callback){
// 	var result = '';
// 	if(location === -1)
// 		location = 'Evanston';
// 	if(time === 'now'){
// 		currentWeather(location, (data) => {
// 			result = data;
// 			console.log('#########');
// 			console.log(result);
// 			console.log('#########');
// 			return result;
// 		});
		
// 		// fs.readFile('test.txt', 'utf8', function (err,data) {
//   // 			if (err) {
//   //   			return console.log(err);
//   // 			}
//   // 		console.log(data);
// 		// });
// 	}
// 	//return result;
// }

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
	// query = query.split(" ").join("_");
	// console.log(query);
	options.path = '/v1/forecast.json?key=' + apiKey + '&q=' + query + '&days=' + noOfDays;
	var str = '';
	var result = '';
	http.request(options, (res) => {
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => {
	  	str += chunk;
	  });
	  res.on('end', (chunk) => {
	  	forecast = JSON.parse(str);
	  	// location + date(tomorrow) + average temperature
	  	result += "The weather in " + forecast.location.name + " of date: " 
	  			+ forecast.forecast.forecastday[1].date + " will be " + forecast.forecast.forecastday[1].day.avgtemp_c 
	  			+ " C/" + forecast.forecast.forecastday[1].day.avgtemp_f + " F. It will be \'" + forecast.forecast.forecastday[1].day.condition.text
	  			+ "\'.";
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
	
//current weather takes pin code or location as first parameter, error handler callback as second
//currentWeather('Evanston', errorHandler);
// forecastWeather('Evanston', '1', errorHandler);


//this.getResponse(-1, 'now');
// current weather: currentWeather(cityName, errorhandler)
// weather around fixed time point (e.g what's the weather for 10pm): today but in the future
// whats the weather for tomorrow - 10 days from now : 
// question for activity:  return condition first 