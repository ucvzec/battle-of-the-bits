#Word Police Bot!

This bot works by joining your service and policing it for forbidden words!

##Usage
`Word Police` is written in ECMAScript using a mixture of Nodejs and Discord.js for API calls to Discord.
To run the bot you first need to install the bot's dependencies, so enter the directory of the bot and enter `npm install` in your command prompt. After doing that you will need to place your Discord Bot's secret as `secret.json` in the same directory as the bot. This secret is used to authenticate the bot to Discord's servers. 
Next, you need to invite the bot to your server by inviting it using the following link:
`https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=0`, where `YOUR_CLIENT_ID` corresponds to the Client ID found on your discord developer application page for the bot. This will allow you to select what servers the bot can join. 
After doing all of this - you're ready to run the bot! Type `node bot.js` into your console and the bot will start patrolling your server for forbidden words. 

##Functionality 
When the bot sees a new forbidden word/phrase in a message, it will respond to the message with how many forbidden words it saw, and yell at them for that.
All forbidden word messages will be stored in a file called `badmessages.dat`.
This file will store all bad messages said across all servers the bot is in, in the format `userid: <badmessage>`. The bot then uses this information for its leaderboard, which can be displayed by typing the command `!leaderboard`. This command will list the most forbidden inclined speakers on your server, excluding those not a part of the server.
With all that out of the way, that's it! 

##Configuration
The bot's forbidden word list is found within `config.json`. Add items to the `badWordsList` array so that the bot will register them as new bad words. 