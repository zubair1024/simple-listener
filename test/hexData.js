convertHex = require('convert-hex');
bytes = require('bytes');

// var byteArray = convertHex.hexToBytes('9801EC00FFFF3500').join(',');

// byteArray.reverse();

//Example of getting the value for first two bytes
byteArrayToLong = function (byteArray) {
    var value = 0;

    for (var i = byteArray.length - 1; i >= 0; i--) {
        value = (value * 256) + byteArray[i];
    }

    return value;
};


let byteArray = convertHex.hexToBytes('9801EC00FFFF3500'),
    copy,
    result = {};

if (byteArray) {
    result["phaseABLineToLineVoltage"] = byteArrayToLong(byteArray.slice(0, 2));
    result["phaseALineToNeutralVoltage"] = byteArrayToLong(byteArray.slice(2, 4));
    result["phaseAFrequency"] = byteArrayToLong(byteArray.slice(4, 6));
    result["phaseACurrent"] = byteArrayToLong(byteArray.slice(6, 8));
}

console.log(result);