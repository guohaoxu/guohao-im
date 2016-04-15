$(window).on("load", function () {
    var myScroll = new IScroll(".main-content", {
        mouseWheel: false
    });
});


$(function () {
    $("#login-form").on("submit", function (e) {
       e.preventDefault();
       $.ajax({
           url: "/api/login",
           method: "POST",
           data: {
               name: $("#login-name").val(),
               password: $("#login-pw").val()
           }
       }).done(function (data) {
           console.log(data);
           //Object {code: "1", msg: "登录成功"}
           if (data.code === "1") {
               window.username = data.name;
               $("#login-panel").hide();
               $("#chat-panel").removeClass("hidden");
           }
       });
    });

    $.ajax({
           url: "/api/online",
           method: "GET"
       }).done(function (data) {
           console.log(data);
           //Object {code: "1", msg: "已登录", name: "admin"}
           if (data.code === "1") {
               window.username = data.name;
               $("#login-panel").hide();
               $("#chat-panel").removeClass("hidden");
           }
       });

});

//var socket = io();
//$('form').on("submit", function(){
//    socket.emit('chat message', $('#m').val());
//    $('#m').val('');
//    return false;
//});
//socket.on('chat message', function(msg){
//    $('.chat-list ul').append($('<li/>').html(msg));
//});
//
//
//$(".friends-list li").click(function () {
//   $("#chat-panel").addClass("show");
//});
//
//$("#back").click(function () {
//   $("#chat-panel").removeClass("show");
//});