$(window).on("load", function () {
    var myScroll = new IScroll(".main-content", {
        mouseWheel: false
    });
});

var socket = io();
$('form').on("submit", function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
socket.on('chat message', function(msg){
    $('.chat-list ul').append($('<li/>').html(msg));
});


$(".friends-list li").tap(function () {
   $("#chat-panel").addClass("show");
});

$("#back").tap(function () {
   $("#chat-panel").removeClass("show");
});