/*
 * "index.js"
 * ----------
 * i have no fucking idea what I'm doing lmao
 */

/* initalize dotenv, basically the same as reading from a text file tbh */
require('dotenv').config({path: `${__dirname}/../.env`});

/* import external stuff */
import * as utils from './utilities';
import * as msgCmds from './message-commands';
import * as Discord from 'discord.js';

/* gonna be used to check for a log file */
const cmdArgs:Array<string> = process.argv.slice(2);

/* check for a logfile */
var logFile:string = '';

if(cmdArgs.includes('--logfile')) {
  logFile = cmdArgs[cmdArgs.indexOf('--logfile') + 1];
}
else if (cmdArgs.findIndex(element => element.includes('--logfile=')) != -1) {
  var index:number = cmdArgs.findIndex(element => element.includes('--logfile='));
  logFile = cmdArgs[index].replace('--logfile=', '');
}

/* don't need all the features, just these */
const intents:Discord.Intents = new Discord.Intents();
intents.add(Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MESSAGES);

/* create a new client */
const client:Discord.Client = new Discord.Client({intents: intents});

/* when client is connected, it will output a thing */
client.on('ready', () => {
  utils.log('==================================================', logFile);
  utils.log('logged in as "' + client!.user.tag + '"', logFile);
  utils.log('-------------------------', logFile);
});

/* do a thing if the content of a user message matches */
client.on('messageCreate', async msg => {
  /* if the message is from the bot, ignore it */
  if(msg.author === client.user) return;

  var logOutput = undefined;
  var content = msg.content.toLowerCase();
  var msgItems:Array<string> = content.split(' ');

  switch(msgItems[0]) {
    case "!help":
      var returns = msgCmds.helpCmd();
      msg.channel.send({embeds: [returns.embed]});
      logOutput = "OK";
      break;
    case "!hi":
      msg.channel.send("Hello!");
      logOutput = `OK`;
      break;
    case "!roll":
      var vals = msgCmds.rollRNG(msgItems[1], msg!.member.displayName || msg.author.username);
      msg.channel.send({embeds: [vals.embed]});
      logOutput = vals.logStr;
      break;
    default:
      break;
  }

  if(logOutput != undefined) utils.log(`${msg.author.tag} used ${msgItems[0]}...` + logOutput, logFile);
});

/* handle exit signals */
process.on('SIGTERM', () => {handleExit()});
process.on('SIGINT', () => {handleExit()});
function handleExit() {
  utils.log('received an exit signal, shutting down', logFile);
  utils.log('==================================================', logFile);
  client.destroy();
  process.exit();
}

/* connect to the server */
client.login(process.env.TEST_TOKEN);
