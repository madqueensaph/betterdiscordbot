/*
 * "message-commands.js"
 * ---------------------
 * keepin' all the "!xyzfuckyou"s code in one file
 */

/* we need stuff from the 'discord.js' library */
import {MessageEmbed} from "discord.js";

/* show help prompt with registered commands (aka ones I coded in) */
export function helpCmd() {
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
export function rollRNG(item: string, name: string) {
  var logStr = ''; // will hold error or success string
  var embed = new MessageEmbed()
      .setTitle(name + ': !roll ERROR')
      .setColor('#ff0000');
  var rollScores = '';

  if(item == undefined) {
    logStr += 'error: no inputs provided';
    embed.setDescription('No roll input provided; use "!roll <die sides>*<multiplier>"');
    return {logStr, embed};
  }

  var dieSides:number = 0;
  var rollCount:number = 1;

  if(item.includes('*')) {
    var inputsGiven = item.split('*');

    if(inputsGiven.length > 2) {
      logStr += 'error: too many inputs provided';
      embed.setDescription('Too many roll inputs provided; use "!roll <die sides>*<multiplier>"');
      return {logStr, embed};
    }

    dieSides = <number><unknown>inputsGiven[0];
    rollCount = <number><unknown>inputsGiven[1];
  }
  else dieSides = <number><unknown>item;

  if(isNaN(dieSides)) { // We want a number here
    logStr += 'error: die sides is NaN';
    embed.setDescription('Die side count provided is not a number; make sure to provide a number');
    return {logStr, embed};
  }
  if(isNaN(rollCount)) { // We also want a number here
    logStr += 'error: multiplier is NaN';
    embed.setDescription('Roll count provided is not a number; make sure to provide a number');
    return {logStr, embed};
  }
  if(dieSides < 4) { // We want to roll at least a d4
    logStr += 'error: die side count < 4';
    embed.setDescription('Die side count is too low; use a die side number of at least 4');
    return {logStr, embed};
  }
  if(dieSides > 120) { // We do not want to roll more than a d100
    logStr += 'error: die side count > 120';
    embed.setDescription('Die side count is too high; use a die side number of at most 120');
    return {logStr, embed};
  }
  if(rollCount < 1) {
    logStr += 'error: roll count < 1';
    embed.setDescription('Roll count is too low; must roll at least 1 time');
    return {logStr, embed};
  }
  if(rollCount > 819) {
    logStr += 'error: roll count > 819';
    embed.setDescription('Roll count is too high; use multiplier less than 819');
    return {logStr, embed};
  }

  for(let i = 0; i < rollCount; i++) {
    var rollScore = Math.floor(Math.random() * dieSides) + 1;

    if(i == (rollCount - 1)) {
      rollScores += rollScore;
    }
    else {
      rollScores += rollScore + `, `;
    }
  }

  logStr += 'OK';
  embed.setTitle(name + ': !roll RESULT')
       .setDescription(rollScores)
       .setColor('#00ff00');
  return {logStr, embed};
}
