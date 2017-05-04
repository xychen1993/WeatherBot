var nlp = require('compromise')
const readline = require('readline')
const cases = require('./cases.js').loadCases();

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
	var out = nlp(myText).match('#Date? (now|days|day|week|weeks|hourly|tomorrow)');
	if (out.length == 0) return 'now'
	else return out.out('array')
}



function getIfContains(myText, keywords){
	for (var i=0; i<keywords.length; i++){
		word = keywords[i];
		if (myText.includes(word)){return true;}
	}
	return false;
}



exports.getCase = function (myText){
	for (var id in cases){
		thisCase = cases[id];
		if (getIfContains(myText, thisCase.keywords)){
			return id;
		}
	}
	return "DEFAULT";

// 	var out = nlp(myText).match('#Date? ("pm|am|hour|hourly|hours")');


// 	if (out.length == 0) return 'now'
// 	else return out.out('array')

// 	let 

// 	"now"
// 	"hourly"
// 	"daily"
// 	-1


// "pm|am|hour|hourly|hours"

// today

}

/*
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your question? \n', (answer) => {
  // TODO: Log the answer in a database
  var locations = getLocation(answer)
  var time = getTime(answer)
  console.log(`Location: ${locations}`)
  console.log(`Node: ${time}`)
  rl.close()
})
*/


