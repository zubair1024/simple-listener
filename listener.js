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
    PORT = 8081;


/**
 * Creating the TCP Listener 
 */
net.createServer(function (sock) {
    "use strict";

    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    /**
     * On receiving data through the TCP channel
     */
    sock.on('data', function (data) {

        let now = (new Date()).toISOString(),
            incomingMsg = data.toString('hex');

        //logging the incoming traffic
        console.log(`${now}\t${sock.remoteAddress}: ${data}\n`);

        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log(data);
        console.log(incomingMsg);
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        
        // writerStream.write(`${now}\t${sock.remoteAddress}: ${data}\n`, 'UTF8');


        /**
         * Write back message
         */
        sock.write(Buffer.from('01', 'hex'));
    });

    /**
     * Socket Termination Listener
     */
    sock.on('close', function (data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });



}).listen(PORT);


console.log('Server listening on ' + HOST + ':' + PORT + ' for Falcom');

