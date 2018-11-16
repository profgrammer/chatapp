$(function(){
	var socket = io();

	var username = $("#username");
	var message = $("#message");
	var send_message = $("#send_message");
	var send_username = $("#send_username");
	var chatroom = $("#chatroom");
	var feedback = $("#feedback");
	var count = $("#count");

	message.bind("keypress", function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == 13 && message != "") {
			socket.emit("message_to_server", {message: message.val()});
			message.val("");
		}
	});

	send_username.click(function(){
		console.log(username.val());
		socket.emit("change_username", {username: username.val()});
	});

	send_message.click(function(){
		socket.emit("message_to_server", {message: message.val()});
	});

	socket.on("display_message", function(data){
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
	});
	
	socket.on("display_message1", function(data){
		chatroom.append("<p class='message' align='right'>" + data.username + ": " + data.message + "</p>");
	});

	socket.on("typing", function(data){
		feedback.html("<p><i>" + data.username + " is typing a message... </i></p>");
	});

	socket.on("updatecount", function(data){
		count.html(data.count);
	})

});
