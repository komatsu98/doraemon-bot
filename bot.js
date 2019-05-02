const Discord = require('discord.js'); 
const client = new Discord.Client();
client.login('NTczMzk1NTI3OTIwNTE3MTQy.XMqUXw.Bne6zNqFoBDhRW6Io1E5TMqlrn8');
client.on('ready', () => {   
    console.log('The bot is ready'); 
});

client.on('message', (msg) => {
if (msg.content.includes('drm')) {
    msg.reply('Ai gọi Doraemon đấy?');
}
});