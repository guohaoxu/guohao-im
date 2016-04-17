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
           //Object {code: "1", msg: "登录成功"}
           if (data.code === "1") {
               window.username = data.name;
               $("#login-panel").hide();
               $("#friends-panel").removeClass("hidden");
           } else if (data.code === "0") {
               alert("用户名或密码错误")
           }
       });
    });

    $.ajax({
       url: "/api/online",
       method: "GET"
    }).done(function (data) {
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
        if (data.code === "1") {
            var len = data.data.length;
            for (var i = 0; i < len; i++) {
                var tmpStr = '<li data-id="' + data.data[i]._id + '"><img src="/images/user_01.jpg" alt=""><h2>' + data.data[i].name + '</h2></li>';
                $(".friends-list ul").append(tmpStr);
            }
        }
    });

    $(".friends-list").on("click", "li", function () {
        $("#chat-panel").removeClass("hidden");

        var objUser = $(this).find("h2").html();
        var curUser = window.username;
        window.objUser = objUser;

        $("#chat-panel .title").html(objUser);

        $.ajax({
            url: "/api/messages",
            method: "GET",
            data: {
                objUser: objUser,
                curUser: curUser
            }
        }).done(function (data) {
            var len = data.data.length,
                tmpStr = '';
            for (var i = 0; i < len; i++) {
                tmpStr += '<li><b>' + data.data[i].sayer + '</b>' + ' - ' + data.data[i].txt + '</li>';
            }
            $(".chat-list ul").append(tmpStr);
            bottomScroll();
        });

    });

    $("#chat-panel .back").on("click", function () {
        $("#chat-panel").addClass("hidden");
    });

    var socket = io();

    $('.chat-send form').on("submit", function(){
       // socket.emit('addMess', $('#m').val());
        if ($.trim($("#m").val()) === "") return false;
        socket.emit('addMess', {
            sayer: window.username,
            toer: window.objUser,
            txt: $("#m").val()
        });
        $('#m').val('');
        bottomScroll();
        return false;
    });
    socket.on('backMess', function(msg){
        $('.chat-list ul').append('<li><b>' + msg.sayer + '</b>' + ' - ' + msg.txt + '</li>');
        bottomScroll();
    });

    function bottomScroll() {
        var myScroll = new IScroll(".chat-list", {
            mouseWheel: false
        });
        var pHeight = $(".chat-list").height(),
            cHeight = $(".chat-list ul").height();
        if (cHeight > pHeight) {
            var transY = "translateY(" + (pHeight - cHeight) + "px)";
            $(".chat-list ul").css({
                "transform": transY
            })
        }
    }







});






