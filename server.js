const Discord = require('discord.js');
const client = new Discord.Client();
const configs = require('./configs');
const ReminderClass = require('./Reminder');
const healtyBotId = '576616293730484224';
const healtyChannelId = '777413944880791582';
let minutes = 0;

const cases = {
  SETUP_WATER: 'hw activate',
  OFF_WATER: 'hw deactivate',
  MINUTES_30: 'hw 30',
  MINUTES_60: 'hw 60',
  MINUTES_120: 'hw 120'
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const messageContent = msg.content;
  let timerDelay = 0;
  const role = '777427541500887071';
  const reminderMessage = `RECORDATORIO:
    > Oe <@&${role}> **toma awa** y **acomoda la raja** :droplet::person_in_manual_wheelchair::smile:
  `

  if(minutes <= 0 && msg.author != healtyBotId && msg.channel.id === healtyChannelId) {
    switch(messageContent) {
      case cases.SETUP_WATER:
        msg.channel.send(`Elije el intervalo para recibir **recordatorios para tu salud!**
          > **hw 30**: 30 minutos :clock1:,
          > **hw 60**: 60 minutos :clock2: ,
          > **hw 120**: 2 horas :clock4: 
        `);
        break;
      case cases.OFF_WATER:
        msg.channel.send('>Alertas de Healty **desactivadas** :no_entry_sign:');
        minutes = 0;
        break;
      case cases.MINUTES_30:
        msg.channel.send(`> Healty configurado, **${messageContent} minutos** para la siguiente alerta :smile:
          > puedes cancelarlo con **hw deactivate**
        `);
        regex = /\d+/;
        minutes = regex.exec(messageContent);
        timerDelay = minutesToMs(minutes);
        const reminderLess = new ReminderClass(timerDelay, msg);
        reminderLess.sendMessage(reminderMessage);
        break;
      case cases.MINUTES_60:
        msg.channel.send(`> Healty configurado, **${messageContent} minutos** para la siguiente alerta :smile:
          > puedes cancelarlo con **hw deactivate**
        `);
        regex = /\d+/;
        minutes = regex.exec(messageContent);
        timerDelay = minutesToMs(minutes);
        const reminderMedium = new ReminderClass(timerDelay, msg);
        reminderMedium.sendMessage(reminderMessage);
        break;
      case cases.MINUTES_120:
        msg.channel.send(`> Healty configurado, **${messageContent} minutos** para la siguiente alerta :smile:
          > puedes cancelarlo con **hw deactivate** :thumbsup:
        `);
        regex = /\d+/;
        minutes = regex.exec(messageContent);
        timerDelay = minutesToMs(minutes);
        const reminderHigher = new ReminderClass(timerDelay, msg);
        reminderHigher.sendMessage(reminderMessage);
      default:
        minutes = 0;
        msg.channel.send("Prueba con el comando **hw activate** para continuar :thumbsup:");
        break;
    }
  }
});

const minutesToMs = minutes => {
  return minutes * 60000;
}


client.login(configs.apiKey);