const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");

const secret = require(path.resolve(__dirname, "secret.json")).secret;
const client = new Discord.Client();

client.on('message',(msg)=>{
	msg.channel.send(`Repeat back: ${msg.content}`);
});

client.login(secret).then(()=>{
	console.log(`Bot is online`);
})