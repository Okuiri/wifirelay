module.exports = function(io) {
    var ledState = 0;

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
        //core.relayControl(onoff);
    }
};