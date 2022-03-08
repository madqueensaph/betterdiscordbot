/*
 * "message-commands.js"
 * ---------------------
 * keepin' all the "!xyzfuckyou"s code in one file
 */

/* we need stuff from the 'discord.js' library */
const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');

/* show help prompt with registered commands (aka ones I coded in) */
function helpCmd() {
  var msgStr = '**Registered Commands:**\n' +
      '```!help\n\tshow this information prompt\n' +
      '!hi\n\tI will say "Hello" back\n' +
      '!roll <die_sides>[*<multiplier>]\n\troll <die_sides> die <multiplier> times```';
  var embed = new MessageEmbed()
      .setTitle('!help')
      .setColor('#0000ff')
      .setDescription(msgStr);

  return {embed};
}

/* roll, will split 'x*x' strings */
function rollRNG(item, name) {
  var logStr = ''; // will hold error or success string
  var embed = new MessageEmbed()
      .setTitle(`${name}: !roll ERROR`)
      .setColor('#ff0000');
  var rollScores = '';

  if(item == undefined) {
    logStr += 'no input provided';
    embed.setDescription('No roll input provided; use "!roll <die sides>*<multiplier>"');
    return {logStr, embed};
  }

  var dieSides = 0;
  var rollCount = 1;

  if(item.includes('*')) {
    var inputsGiven = item.split('*');
    dieSides = inputsGiven[0];
    rollCount = inputsGiven[1];
  }
  else dieSides = item;

  if(dieSides < 4) {
    logStr += 'die side count is too low';
    embed.setDescription('Die side count is too low; use a die side number of at least 4');
    return {logStr, embed};
  }
  if(dieSides > 100) {
    logStr += 'die side count is too high';
    embed.setDescription('Die side count is too high; use a die side number of at most 100');
    return {logStr, embed};
  }
  if(rollCount < 1) {
    logStr += 'multiplier is too low';
    embed.setDescription('Multiplier is too low; must roll at least 1 time');
    return {logStr, embed};
  }
  if(rollCount > 100) {
    logStr += 'multiplier is too high';
    embed.setDescription('Multiplier is too high; use multiplier less than 100');
    return {logStr, embed};
  }

  for(let i = 0; i < rollCount; i++) {
    var rollScore = Math.floor(Math.random() * dieSides) + 1;

    if(i == (rollCount - 1)) {
      rollScores += `${rollScore}`;
    }
    else {
      rollScores += `${rollScore}, `;
    }
  }

  logStr += 'OK';
  embed.setTitle(`${name}: !roll RESULT`)
       .setDescription(rollScores)
       .setColor('#00ff00');
  return {logStr, embed};
}

exports.rollRNG = rollRNG;
exports.helpCmd = helpCmd;
