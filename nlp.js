var nlp = require('compromise')
const readline = require('readline')

exports.getIfDisasterCase = function(myText){
	if (myText.toLowerCase().includes('disaster')){
		return true;
	}else {
		return false;
	}
}

exports.getLocation = function (myText){
	var lexicon = {
		'Evanston':'Place',
		'Portland':'Place',
		"New York City": 'Place',
		"Los Angeles": 'Place',
		"Chicago": 'Place',
		"Houston": 'Place',
		"Philadelphia": 'Place',
		"Phoenix": 'Place',
		"San Antonio": 'Place',
		"San Diego": 'Place',
		"Dallas": 'Place',
		"San Jose": 'Place',
		"Austin": 'Place',
		"Jacksonville": 'Place',
		"Indianapolis": 'Place',
		"San Francisco": 'Place',
		"Columbus": 'Place',
		"Fort Worth": 'Place',
		"Charlotte": 'Place',
		"Detroit": 'Place',
		"El Paso": 'Place',
		"Memphis": 'Place',
		"Boston": 'Place',
		"Seattle": 'Place',
		"Denver": 'Place',
		"Washington": 'Place',
		"Nashville": 'Place',
		"Davidson": 'Place',
		"Baltimore": 'Place',
		"Louisville": 'Place',
		"Jefferson": 'Place',
		"Portland": 'Place',
		"Oklahoma ": 'Place',
		"Milwaukee": 'Place',
		"Las Vegas": 'Place',
		"Albuquerque": 'Place',
		"Tucson": 'Place',
		"Fresno": 'Place',
		"Sacramento": 'Place',
		"Long Beach": 'Place',
		"Kansas ": 'Place',
		"Mesa": 'Place',
		"Virginia Beach": 'Place',
		"Atlanta": 'Place',
		"Colorado Springs": 'Place',
		"Raleigh": 'Place',
		"Omaha": 'Place',
		"Miami": 'Place',
		"Oakland": 'Place',
		"Tulsa": 'Place',
		"Minneapolis": 'Place',
		"Cleveland": 'Place',
		"Wichita": 'Place',
		"Arlington": 'Place',
		"New Orleans": 'Place',
		"Bakersfield": 'Place',
		"Tampa": 'Place',
		"Honolulu": 'Place',
		"Anaheim": 'Place',
		"Aurora": 'Place',
		"Santa Ana": 'Place',
		"St. Louis": 'Place',
		"Riverside": 'Place',
		"Corpus Christi": 'Place',
		"Pittsburgh": 'Place',
		"Lexington-Fayette": 'Place',
		"Stockton": 'Place',
		"Cincinnati": 'Place',
		"St. Paul": 'Place',
		"Toledo": 'Place',
		"Newark": 'Place',
		"Greensboro": 'Place',
		"Plano": 'Place',
		"Henderson": 'Place',
		"Lincoln": 'Place',
		"Buffalo": 'Place',
		"Fort Wayne": 'Place',
		"Jersey ": 'Place',
		"Chula Vista": 'Place',
		"Orlando": 'Place',
		"St. Petersburg": 'Place',
		"Norfolk": 'Place',
		"Chandler": 'Place',
		"Laredo": 'Place',
		"Madison": 'Place',
		"Durham": 'Place',
		"Lubbock": 'Place',
		"Winston-Salem": 'Place',
		"Garland": 'Place',
		"Glendale": 'Place',
		"Hialeah": 'Place',
		"Reno": 'Place',
		"Baton Rouge": 'Place',
		"Irvine": 'Place',
		"Chesapeake": 'Place',
		"Irving": 'Place',
		"Scottsdale": 'Place',
		"North Las Vegas": 'Place',
		"Fremont": 'Place',
		"San Bernardino": 'Place',
		"Boise": 'Place',
		"Birmingham": 'Place'
	}

	//parse the text
	var r = nlp(myText,lexicon)
	
	//grab the mentioned locations
	var places = r.places()
	if (places.length == 0) return -1;
	return places.out('array')
}


exports.getTime = function (myText){
	var out = nlp(myText).match('(now|week|weeks|hourly|tomorrow|tuesday|monday|wednesday|thursday|friday|saturday|sunday)');
	
	var r = myText.toString();
	var reg_hour = /[0-9]+(\s)*[ap]m/gi;   //
	var hourly = r.match(reg_hour);

	var reg_day_number = /[0-9]+[-(\s)*]day[s]?(\s)forecast/gi;
	var day_number = r.match(reg_day_number);
	var reg_number = /[0-9]+/gi;
	var number_day = null;
	if(day_number)
		number_day = parseInt(day_number.toString().match(reg_number));
	
	
	var time = "";

	if(out.length == 0){
		time = {
			day: 'now',
			hour: hourly,
			day_number: number_day
		}
	}
	else{
		time = {
			day: out.out('array'),
			hour: hourly,
			day_number: number_day
		}
	}

	console.log("In getTime " + time.day_number + " OUT: " + out.out('array'))

	return time;

	// if (out.length == 0) return 'now'
	// else return out.out('array')
}

function getIfContains(myText, keywords){
	for (var i=0; i<keywords.length; i++){
		word = keywords[i];
		if (myText.includes(word)){return true;}
	}
	return false;
}
	