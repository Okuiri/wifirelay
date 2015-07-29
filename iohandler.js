module.exports = function(io){
    var spark = require('sparknode');

    var core = new spark.Core({
        accessToken: "45404214d66462979846996e94c1581a62b0741c",
        id: "johncena"
    });
    var ledState = 0;
    core.on('connect',function(){
        core.relayControl(getLedState());
    });
    io.sockets.on('connection', function (socket) {
        socket.on('disconnect', function () {
        });
        socket.emit('ledInit', getLedState());

        socket.on('led', function (msg) {
            if (msg == 'status') {
                console.log('Switching state ');
                ledState = !ledState;
                console.log(getLedState());
                updateUsers();
            }
        });
        socket.broadcast.emit('ledOut', getLedState());
    });

    function getLedState() {
        return ledState ? 'on' : 'off';
    }

    function updateUsers() {
        var onoff = getLedState();
        io.sockets.emit('ledOut', onoff);
        core.relayControl(onoff);
    }
};