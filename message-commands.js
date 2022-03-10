"use strict";
/*
 * "message-commands.js"
 * ---------------------
 * keepin' all the "!xyzfuckyou"s code in one file
 */
exports.__esModule = true;
exports.rollRNG = exports.helpCmd = void 0;
/* we need stuff from the 'discord.js' library */
var discord_js_1 = require("discord.js");
/* show help prompt with registered commands (aka ones I coded in) */
function helpCmd() {
    var msgStr = '**Registered Commands:**\n' +
        '```!help\n\tshow this information prompt\n' +
        '!hi\n\tI will say "Hello" back\n' +
        '!roll <die_sides>[*<multiplier>]\n\troll <die_sides> die <multiplier> times```';
    var embed = new discord_js_1.MessageEmbed()
        .setTitle('!help')
        .setColor('#0000ff')
        .setDescription(msgStr);
    return { embed: embed };
}
exports.helpCmd = helpCmd;
/* roll, will split 'x*x' strings */
function rollRNG(item, name) {
    var logStr = ''; // will hold error or success string
    var embed = new discord_js_1.MessageEmbed()
        .setTitle(name + ': !roll ERROR')
        .setColor('#ff0000');
    var rollScores = '';
    if (item == undefined) {
        logStr += 'error: no inputs provided';
        embed.setDescription('No roll input provided; use "!roll <die sides>*<multiplier>"');
        return { logStr: logStr, embed: embed };
    }
    var dieSides = 0;
    var rollCount = 1;
    if (item.includes('*')) {
        var inputsGiven = item.split('*');
        if (inputsGiven.length > 2) {
            logStr += 'error: too many inputs provided';
            embed.setDescription('Too many roll inputs provided; use "!roll <die sides>*<multiplier>"');
            return { logStr: logStr, embed: embed };
        }
        dieSides = inputsGiven[0];
        rollCount = inputsGiven[1];
    }
    else
        dieSides = item;
    if (isNaN(dieSides)) { // We want a number here
        logStr += 'error: die sides is NaN';
        embed.setDescription('Die side count provided is not a number; make sure to provide a number');
        return { logStr: logStr, embed: embed };
    }
    if (isNaN(rollCount)) { // We also want a number here
        logStr += 'error: multiplier is NaN';
        embed.setDescription('Roll count provided is not a number; make sure to provide a number');
        return { logStr: logStr, embed: embed };
    }
    if (dieSides < 4) { // We want to roll at least a d4
        logStr += 'error: die side count < 4';
        embed.setDescription('Die side count is too low; use a die side number of at least 4');
        return { logStr: logStr, embed: embed };
    }
    if (dieSides > 120) { // We do not want to roll more than a d100
        logStr += 'error: die side count > 120';
        embed.setDescription('Die side count is too high; use a die side number of at most 120');
        return { logStr: logStr, embed: embed };
    }
    if (rollCount < 1) {
        logStr += 'error: roll count < 1';
        embed.setDescription('Roll count is too low; must roll at least 1 time');
        return { logStr: logStr, embed: embed };
    }
    if (rollCount > 819) {
        logStr += 'error: roll count > 819';
        embed.setDescription('Roll count is too high; use multiplier less than 819');
        return { logStr: logStr, embed: embed };
    }
    for (var i = 0; i < rollCount; i++) {
        var rollScore = Math.floor(Math.random() * dieSides) + 1;
        if (i == (rollCount - 1)) {
            rollScores += rollScore;
        }
        else {
            rollScores += rollScore + ", ";
        }
    }
    logStr += 'OK';
    embed.setTitle(name + ': !roll RESULT')
        .setDescription(rollScores)
        .setColor('#00ff00');
    return { logStr: logStr, embed: embed };
}
exports.rollRNG = rollRNG;
