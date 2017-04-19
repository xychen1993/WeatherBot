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
	var out = nlp(myText).match('#Date? (now|days|day|week|weeks|hourly)');
	if (out.length == 0) return 'now'
	else return out.out('array')
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


