# WeatherBot :sunny::sunglasses::ok_hand:
Messenger chat bot with conversational weather reporting

![demo](assets/screen.gif)  
[Try it yourself here!](https://arcane-ocean-55967.herokuapp.com/webhook/localChat/)
***
## Features
* NLP based location city detection and state inference
* City/activity inference from past queries
* Multiple weather report modes: hourly, daily
* Report mode inference based on user query (in english)
* Outdoors activity recommendations
* Weather context reporting based on location's historical weather 
* Alerts users of local disasters in weather area queries
* Recommends public articles about local disasters
* Support for local chat and heroku hosted messenger bot

## Installation

```bash
git clone https://github.com/xychen1993/WeatherBot.git
cd WeatherBot
sudo apt-get install node
sudo npm get package.json
node index.js
```

## Usage

**Local**: chat locally at [localhost:5000/webhook/localChat/](http://localhost:5000/webhook/localChat/)  
**Online**: deploy to a Heroku hosted bot by setting PAGE_ACCESS_TOKEN and VERIFY_TOKEN environment variables, and pointing the webhook to your heroku server. Take a look at jw84's excellent [walkthrough](https://github.com/jw84/messenger-bot-tutorial).