"use strict";

/**
 * Requiring necessary modules
 */
var net = require('net'),
    fs = require('fs');

/**
 * Host IP and Port
 */
var HOST = '138.68.78.117',
    PORT = 3001;


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
            incomingMsg = data.toString();

        //logging the incoming traffic
        console.log(`${now}\t${sock.remoteAddress}: ${data}\n`);

        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log(data);
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

        // writerStream.write(`${now}\t${sock.remoteAddress}: ${data}\n`, 'UTF8');


        /**
         * Write back message
         */
        sock.write('AT+HEXMSG=0A3031320D');
    });

    /**
     * Socket Termination Listener
     */
    sock.on('close', function (data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });



}).listen(PORT, HOST);


console.log('Server listening on ' + HOST + ':' + PORT + ' for Falcom');

