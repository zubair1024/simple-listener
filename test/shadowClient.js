var net = require('net');

var client = new net.Socket();
  // setInterval(function () {
     client.connect(6102, '127.0.0.1', function () {
        console.log('Connected');
        var buff = new Buffer("03004340614427100c0016ee383294470019df5e04", "hex");
        // setInterval(function () {
            client.write(buff);
        // }, 1);
    });
  // }, 500);

client.on('data', function (data) {
    console.log('Received: ' + data);
      client.destroy(); // kill client after server's response
});

client.on('close', function () {
    console.log('Connection closed');
});