//$(window).on("load", function () {
//    var myScroll = new IScroll(".main-content", {
//        mouseWheel: false
//    });
//});


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
               $("#friends-panel").removeClass("hidden");
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
           $("#friends-panel").removeClass("hidden");
       }
    });

    $.ajax({
        url: "/api/friends",
        method: "GET"
    }).done(function (data) {
            console.log(data);
        if (data.code === "1") {
            var len = data.data.length;
            for (var i = 0; i < len; i++) {
                var tmpStr = '<li data-id="' + data.data[i]._id + '"><img src="/images/user_01.jpg" alt=""><h2>' + data.data[i].name + '</h2></li>';
                $(".friends-list ul").append(tmpStr);
            }
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