"use strict";
/*
 * "utilities.js"
 * --------------
 * *realllly* want "index.js" small for some reason
 */
exports.__esModule = true;
exports.log = void 0;
/* need to bring in things from other files */
var fs = require("fs");
/* nobody wants to see time formatting shit 500 times */
function getTimeString() {
    /* date in local timezone format */
    var datetime = new Date();
    /* zero-pad appropriate values */
    var year = datetime.getUTCFullYear();
    var month = ('00' + (datetime.getUTCMonth() + 1)).slice(-2); // starts at 0
    var date = ('00' + datetime.getUTCDate()).slice(-2);
    var hour = ('00' + datetime.getUTCHours()).slice(-2);
    var minute = ('00' + datetime.getUTCMinutes()).slice(-2);
    var second = ('00' + datetime.getUTCSeconds()).slice(-2);
    /* print the time to  */
    return "".concat(year, "-").concat(month, "-").concat(date, " ").concat(hour, ":").concat(minute, ":").concat(second);
}
/* nobody wants to see logging shit 500 times */
function log(content, logFile) {
    var processedContent = undefined;
    if (content.includes('-----') || content.includes('=====')) {
        processedContent = content;
    }
    else {
        processedContent = getTimeString() + ' - ' + content;
    }
    console.log('\r' + processedContent); // carriage return makes quit by CTRL+C look better
    if (logFile.length != 0) {
        fs.appendFileSync(logFile, processedContent + '\n'); // end with newline for the next set of output
    }
}
exports.log = log;
