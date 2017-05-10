var nlp = require('compromise')
const readline = require('readline')

exports.getLocation = function (myText){
	var lexicon = {
	  'Evanston':'Place'
	}	//parse the text

	var r = nlp(myText,lexicon)
	//grab the mentioned locations
	var places = r.places()
	if (places.length == 0) return -1;
	return places.out('array')
}


exports.getTime = function (myText){
	var out = nlp(myText).match('#Date? (now|days|day|week|weeks|hourly|tomorrow|tuesday|monday|wednesday|thursday|friday|saturday|sunday)');
	
	var reg = /[0-9]+(\s)*[ap]m/gi;
	var r = myText.toString();
	var hourly = r.match(reg);
	//console.log("Found " + r.match(reg));
	var time = "";

	if(out.length == 0){
		time = {
			day: 'now',
			hour: hourly
		}
	}
	else{
		time = {
			day: out.out('array'),
			hour: hourly
		}
	}
	return time

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
	