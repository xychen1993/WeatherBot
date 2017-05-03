cases = {
	"hourly": {
		"keywords": ["pm", "am", "hour", "hourly", "hours"], 
		"action": function(input){
			location = input.location;
			return "hourly message for " + location;
		}
	},
	"daily": {
		"keywords": ["tomorrow", "week", "days", "day"],
		"action": function(input){
			location = input.location;
			return "daily message for " + location;
		}
	},
	"DEFAULT": {
		"keywords": [],
		"action": function(input){
			return "Sorry, I didn't catch that";
		}
	}
}

exports.loadCases = function (){return cases}
