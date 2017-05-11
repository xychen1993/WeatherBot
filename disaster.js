var request = require('request')

// var url = "https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=("


// exports.getDisasterJson = function(state, incidentType, incidentBeginDate) {
function getDisasterJson(state) {
  // var url = "https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=("

  // //url += "substringof('" + declaredCountyArea + "', declaredCountyArea)"
  // url += "state eq '" + state + "'"
  // url += " and "
  // url += "incidentType eq '" + incidentType + "'"
  // url += " and "
  // url += "substringof('" + incidentBeginDate + "', incidentBeginDate))"
  // url += "&$format=json"
  
  var url = "https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=state eq "
  url += "'" + state + "'"
  url += "&$format=json&$orderby=incidentBeginDate desc&$top=1"
  console.log(url)

  requestJsonFile(url, function(body){
    console.log(body.DisasterDeclarationsSummaries)
    
  });

}

//Using google map's api to get state name from city name
function getDisaster(cityName) {
  var url = "http://maps.googleapis.com/maps/api/geocode/json?address="
  url += cityName
  url += "&sensor=false"
  
  requestJsonFile(url, function(body){
    var formatted_address = body.results[0].formatted_address.split(", ")
    var stateName = formatted_address[1]
    //getDisasterJson(stateName,'Earthquake','1987-10-01')
    getDisasterJson(stateName)

  });
  
}

function requestJsonFile(url, callback) {
  request({
    url: url,
    json: true
  }, function (error, response, body) {
     if (!error && response.statusCode === 200) {
      callback(body);
     }
  })
}

getDisaster("los angles")

//console.log(state);
// getDisasterJson(state,'Earthquake','1987-10-01')
// requestJsonFile()




