var net = require('net');

c = new net.connect(3001,'127.0.0.1');

c.on('data',function(msg){
    console.log(msg.toString());
});

c.write('hi');