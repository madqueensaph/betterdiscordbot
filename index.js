"use strict";
/*
 * "index.js"
 * ----------
 * i have no fucking idea what I'm doing lmao
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* initalize dotenv, basically the same as reading from a text file tbh */
require('dotenv').config({ path: __dirname + '/../.env' });
/* import external stuff */
var utils = require("./utilities");
var msgCmds = require("./message-commands");
var Discord = require("discord.js");
/* gonna be used to check for a log file */
var cmdArgs = process.argv.slice(2);
/* check for a logfile */
var logFile = '';
if (cmdArgs.includes('--logfile')) {
    logFile = cmdArgs[cmdArgs.indexOf('--logfile') + 1];
}
else if (cmdArgs.findIndex(function (element) { return element.includes('--logfile='); }) != -1) {
    var index = cmdArgs.findIndex(function (element) { return element.includes('--logfile='); });
    logFile = cmdArgs[index].replace('--logfile=', '');
}
/* don't need all the features, just these */
var intents = new Discord.Intents();
intents.add(Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES);
/* create a new client */
var client = new Discord.Client({ intents: intents });
/* when client is connected, it will output a thing */
client.on('ready', function () {
    utils.log('==================================================', logFile);
    utils.log('logged in as "' + client.user.tag + '"', logFile);
    utils.log('-------------------------', logFile);
});
/* do a thing if the content of a user message matches */
client.on('messageCreate', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var logOutput, content, msgItems, returns, vals;
    return __generator(this, function (_a) {
        /* if the message is from the bot, ignore it */
        if (msg.author === client.user)
            return [2 /*return*/];
        logOutput = undefined;
        content = msg.content.toLowerCase();
        msgItems = content.split(' ');
        switch (msgItems[0]) {
            case "!help":
                returns = msgCmds.helpCmd();
                msg.channel.send({ embeds: [returns.embed] });
                logOutput = "OK";
                break;
            case "!hi":
                msg.channel.send("Hello!");
                logOutput = "OK";
                break;
            case "!roll":
                vals = msgCmds.rollRNG(msgItems[1], msg.member.displayName || msg.author.username);
                msg.channel.send({ embeds: [vals.embed] });
                logOutput = vals.logStr;
                break;
            default:
                break;
        }
        if (logOutput != undefined)
            utils.log(msg.author.tag + ' used' + msgItems[0] + '...' + logOutput, logFile);
        return [2 /*return*/];
    });
}); });
/* handle exit signals */
process.on('SIGTERM', function () { handleExit(); });
process.on('SIGINT', function () { handleExit(); });
function handleExit() {
    utils.log('received an exit signal, shutting down', logFile);
    utils.log('==================================================', logFile);
    client.destroy();
    process.exit();
}
/* connect to the server */
client.login(process.env.TEST_TOKEN);
