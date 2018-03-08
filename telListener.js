"use strict";

/**
 * Requiring necessary modules
 */
var net = require('net'),
    fs = require('fs');

/**
 * Host IP and Port
 */
var HOST = 'jgroute.ddns.net',
    PORT = 5101;


/**
 * Creating the TCP Listener 
 */
net.createServer(function (sock) {
    "use strict";

    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    /**
     * On receiving data through the TCP channel
     */
    sock.on('data', function (msg) {

        let now = (new Date()).toISOString(),
            incomingMsg = msg.toString('hex');

        //logging the incoming traffic
        console.log(`${now}\t${sock.remoteAddress}: ${msg}\n`);

        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log(msg);
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');


        //logging the incoming traffic
        console.log(`${sock.remoteAddress}: ${msg.toString("hex")}\n`);

        //if data is present then parse
        if (msg && msg.length) {
            //get address
            let deviceAddress = sock.remoteAddress + ":" + sock.remotePort;
            //persist the socket
            socketList[deviceAddress] = sock;

            //check start of the message 00000000 (4 bytes)
            if (parseInt(msg.slice(0, 4).toString("hex"), 16) === 0) {

                //check the length of the message (4 bytes)
                let totalLength = parseInt(msg.slice(4, 8).toString("hex"), 16);

                //hack check the length of the message from the 12 byte
                if (totalLength == msg.slice(12, msg.length).length) {

                    //get number of messages
                    let chucksLength = parseInt(msg.slice(9, 10).toString("hex"), 16);

                    //padding for 4 bytes and write ack to sock
                    let chucksLengthHex = chucksLength.toString(16);

                    while (chucksLengthHex.length < 6) {
                        chucksLengthHex = "0" + chucksLengthHex;
                    }

                    //write response as ACK
                    sock.write(Buffer.from(chucksLengthHex));

                    console.log('Teltonika Message:');
                    console.log(msg);


                } else {
                    console.log('Teltonika: The message length did not match');
                }
            } else {
                console.log('Teltonika: No start found');
            }
        } else {
            console.log("Teltonika: Invalid message length");
        }
    });

    /**
     * Socket Termination Listener
     */
    sock.on('close', function (msg) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });



}).listen(PORT);


console.log('Server listening on ' + HOST + ':' + PORT + ' for Falcom');

