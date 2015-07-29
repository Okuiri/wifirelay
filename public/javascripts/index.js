var socket = io();
var localState;

socket.on('ledInit', function(msg){
    setBackground(msg);

});

socket.on('ledOut', function(msg){
    setBackground(msg);
});


$('#ledtoggle').click(function(){
    socket.emit('led', 'status');
});

function setBackground(msg){
    localState = msg;
    var window = $('#window');
    var onoff = $('#onoff');
    onoff.text(localState);
    if(localState=='off'){
        window.css('background', 'black');
        window.css('color','white');
        onoff.css('color', 'red');
    } else {
        window.css('background', 'white');
        window.css('color','black');
        onoff.css('color', 'green');
    }
}