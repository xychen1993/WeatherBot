cases = {
	"hourly": {
		"keywords": ["pm", "am", "hour", "hourly", "hours"], 
		"action": function(input){
			return "hourly message";
		}
	},
	"daily": {
		"keywords": ["tomorrow", "week", "days", "day"],
		"action": function(input){
			return "daily message";
		}
	}
}


exports.loadCases = function (){return cases}
