var net = require('net');

var IP = '76.70.18.14',
PORT = 1555;

// var IP = '12.47.179.12',
// PORT = 10800;

var client = new net.Socket();
client.connect(PORT, IP, function () {
    console.log('Connected');
    // client.write('Hello');
    // client.write('1970x4121"Msg1"3004340614427100x00000x42700x0D0x300x310x32');
    // var buff = new Buffer("01001F4115000000013330303033343031303132333435300000420410313233", "hex");
    var buff = new Buffer("01001F4100153030303033303034333430363134343237313000004200040A333333", "hex");
    console.log(buff);
    client.write(buff);
});

client.on('data', function (data) {
    console.log('Received');
    console.log(data);
    // client.destroy(); // kill client after server's response
});

client.on('close', function () {
    console.log('Connection closed');
});