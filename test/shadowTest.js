var convertHex = require('convert-hex');

// var buff = new Buffer("03004340614427100c0016e48432a32a001ed88104", "hex"),
// var buff = new Buffer("03004340614427100c0016e48932a3300018d12e04", "hex"),
// var buff = new Buffer("03004340614427100c0016e48a32a3330018d39f04", "hex"),
// var buff = new Buffer("03004340614427100c0016e48732a32d0018d61104", "hex"),
// var buff = new Buffer("03004340614427100c0016e48732a32d0018d61104", "hex"),
var buff = new Buffer("03004340614427100c0016e48432a32a001ed88104", "hex"),
    hexArray = buff.toString('hex').match(/.{1,2}/g),
    chucks = '';

let copy,
    result = {};
if (hexArray) {
    //Byte 1-8 = imei 
    result["imei"] = buff.slice(0, 8).join('');
    //Byte 9 = payload
    result["payload"] = parseInt(buff.slice(8, 9)[0], 16);
    //Byte 10 = message type
    result["type"] = (function (byte = buff.slice(9, 10)) {
        switch (byte.toString('hex')) {
            case '00': return 'Short GPS';
                break;
            default: return 'Unknown';
                break;
        }
    })();

    /**
     * Byte 11-13 = Time and Lat
     * Bit 2-24	 = Lat 
     */
    result["latitute"] = ((parseInt(buff.slice(10, 13).toString('hex'), 16) << 1) / 120000);

    //Byte 14-16 = Lon
    result["logitude"] = ((parseInt(buff.slice(13, 16).toString('hex'), 16)) / 60000);

    //Byte 17 = Speed
    result["speed"] = parseInt(buff.slice(16, 17)[0], 16) * 0.51444;

    //Byte 18
    chucks = parseInt(buff.slice(17, 18)[0], 16);
    //Bit 1
    result["interface"] = chucks & 128 ? 'external' : 'standalone';
    //Bit 2
    result["panicAck"] = chucks & 128 ? 'ACK' : 'No Ack';
    //Bit 3
    result["panic"] = chucks & 128 ? 'On' : 'Off';
    //Bit 4
    result["latituteSign"] = chucks & 128 ? 'North' : 'South';
    //Bit 5
    result["longitudeSign"] = chucks & 128 ? 'East' : 'West';
    //Bit 6-8
    result["heading"] = (function (chucks) {
        switch (chucks & 128) {
            case 0: return 'North';
                break;
            case 1: return 'North East';
                break;
            case 2: return 'East';
                break;
            case 3: return 'South East';
                break;
            case 4: return 'South';
                break;
            case 5: return 'South West';
                break;
            case 6: return 'West';
                break;
            case 7: return 'North West';
                break;
            default: return 'Unknown';
                break;
        }
    })();

    //Byte 19-20 = Time from Midnight (GMT) in seconds
    result["secondsFromMidnight"] = parseInt(buff.slice(18, 20).toString('hex'), 16);

    //Byte 21
    chucks = parseInt(buff.slice(20, 21)[0], 16);
    console.log(buff.slice(19, 20));
    //Bit 3-4
    result["ignition"] = (function () {
        switch (chucks & 128) {
            case 0: return 'Standard GPS Report';
                break;
            case 1: return 'Igniton On';
                break;
            case 2: return 'Ignition Off';
                break;
            default: return 'Unknown';
                break;
        }
    })();
    //Bit 5- 8
    result["battery"] = (function () {
        switch (chucks & 15) {
            case 8: return {
                "charging": false,
                "fullyCharged": false,
                "level": 0
            };
                break;
            case 4: return {
                "charging": false,
                "fullyCharged": false,
                "level": 25
            };
                break;
            case 12: return {
                "charging": false,
                "fullyCharge": false,
                "level": 50
            };
                break;
            case 2: return {
                "charging": false,
                "fullyCharge": false,
                "level": 75
            };
                break;
            case 10: return {
                "charging": false,
                "fullyCharge": false,
                "level": 100
            };
                break;
            case 1: return {
                "charging": true,
                "fullyCharge": false,
                "level": 0
            };
                break;
            case 9: return {
                "charging": true,
                "fullyCharge": false,
                "level": 25
            };
                break;
            case 5: return {
                "charging": true,
                "fullyCharge": false,
                "level": 50
            };
                break;
            case 13: return {
                "charging": true,
                "fullyCharge": false,
                "level": 75
            };
                break;
            case 3: return {
                "charging": true,
                "fullyCharge": false,
                "level": 100
            };
                break;
            case 15: return {
                "charging": true,
                "fullyCharge": true,
                "level": 100
            };
                break;
            default: return {
                "charging": null,
                "fullyCharged": null,
                "level": null
            };
                break;
        }
    })();

}

console.log(result);