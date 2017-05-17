var TMClient = require('textmagic-rest-client');

var c = new TMClient('zubairahmed', '68r7E9f9ISS2KXAnMBBrzbVaJoHpLQ');

c.Messages.send({text: 'test message for SMS gateway. Booya! It works!', phones:'00971567552137'}, function(err, res){
    console.log('Messages.send()', err, res);
});