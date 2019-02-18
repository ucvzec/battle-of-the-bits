const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");

const secret = require(path.resolve(__dirname, "secret.json")).secret;
const client = new Discord.Client();

let config = require(path.resolve(__dirname, "config.json"));
let badWordsList = config.badWordsList;

client.on('message',(msg)=>{
	handleMessage(msg);
});

function handleMessage(msg) {
	let message = msg.content.toLowerCase();
	switch(message){
		case "!leaderboard":
			let leaderboard = badWordLeaderboard();
			leaderboard = new Map([...leaderboard.entries()].sort((a,b)=>{
				return a > b;
			}));
			let hasFoundBiggestBaddestBoy = false;
			leaderboard.forEach((badWordCount, userid)=>{
				let guildMember = msg.guild.members.get(userid);
				let memberName = guildMember.displayName;
				if(!guildMember.user.bot) {
					if(hasFoundBiggestBaddestBoy) {
						if(msg.guild.members.has(userid)) {
							msg.channel.send(`${memberName} has said ${badWordCount} forbidden words.`);
						}
					} else {
						hasFoundBiggestBaddestBoy = true;
						msg.channel.send(`${memberName} is the biggest baddest boy with ${badWordCount} FORBIDDEN WORDZ!!`);
					}
				}
			});
			break;
		case "!legend":
			msg.channel.send(`Have you heard the tale of the Cordell? It's not a story a silver would tell you. They say he had the power to get a triple ace to save his team and carry them to gold, but could not carry himself. They say that till this day he still remains a silver fucking noob.`);
			break;
		default:
			//makes the bot ignore itself
			if(msg.author.id !== client.user.id) {
				let badWordCounter = 0;
				badWordsList.forEach((badWord)=>{
					if(msg.content.toLowerCase().includes(badWord)) {
						message = msg.content.replace(/\n/g, config.newlineSequence).replace(/\t/g, config.tabSequence);
						fs.appendFileSync(path.resolve(__dirname, config.badWordsFile), `${msg.author.id}: ${message}${'\n'}`);
						//terminates the loop after one badword is found, so that users aren't counted multiple times
						++badWordCounter;
					}
				});
				if(badWordCounter > 0) {
					msg.channel.send(`You said ${badWordCounter} forbidden word${badWordCounter>1?"s":""} ${msg.member.displayName}!`);
				}
			}
	}
}

function badWordLeaderboard(){
	let leaderBoardString = "";
	let data = fs.readFileSync(path.resolve(__dirname, config.badWordsFile), 'utf8');
	data = data.split(/\n/);
	data = data.filter((entry)=>{
		return entry.match(/^[0-9]{17,18}: .*$/);
	});
	leaderboard = new Map();
	usernameMatch = {};
	data.forEach((badwordEntry)=>{
		let userid = badwordEntry.split(":", 2)[0];
		if(!(leaderboard.has(userid))) {

			leaderboard.set(userid, 0);
		}
		leaderboard.set(userid, leaderboard.get(userid)+1);
	});
	return leaderboard;
}

client.login(secret).then(()=>{
	console.log(`Bot is online`);
});

const readline = require("readline");
const rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout,
});
rl.on('line',(input)=>{
	//console.log(`Recieved: ${input}`);
	if(input.startsWith("!eval")){
		try{
			eval(input.slice(input.indexOf(" ")));
		}catch(err){
			console.log(err);
		}
	}
});