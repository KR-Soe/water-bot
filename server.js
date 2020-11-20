const Discord = require('discord.js');
const client = new Discord.Client();
const configs = require('./configs');

const healtyBotId = '576616293730484224';
const healtyChannelId = '777413944880791582';
const cases = {
  SETUP_WATER: 'hw activate',
  OFF_WATER: 'hw deactivate',
  MINUTES_30: '30',
  MINUTES_60: '60',
  MINUTES_120: '120'
};
let minutes = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const messageContent = msg.content;
  if(minutes <= 0 && msg.author != healtyBotId && msg.channel.id === healtyChannelId) {
    console.log('messageContent', messageContent);
    switch(messageContent) {
      case cases.SETUP_WATER:
        msg.channel.send(`Tell me the intervale of MINUTES PER ALERT (30, 60 or 120)`);
        break;
      case cases.OFF_WATER:
        msg.channel.send('Water Reminder deactivated');
        minutes = 0;
        break;
      case cases.MINUTES_30:
        msg.channel.send(`Ok, Ill remind you to drink water every ${messageContent} minutes`);
        minutes = messageContent;
        const timerDelay = minutesToMs(minutes);

        const reminder = () => {
          const role = '777427541500887071';
          msg.channel.send(`Hey <@&${role}> Dont Forget to drink Water`);
        }
        setTimeout(reminder, timerDelay);

        break;
      case cases.MINUTES_60:
        msg.channel.send(`Ok, Ill remind you to drink water every ${messageContent} minutes`);
        minutes = messageContent;
        break;
      case cases.MINUTES_120:
        msg.channel.send(`Ok, Ill remind you to drink water every ${messageContent} minutes`);
        minutes = messageContent;
        break;
      default:
        break;
    }
   
  }

});

const minutesToMs = (minutes) => {
  return minutes * 60000;
}


client.login(configs.apiKey);