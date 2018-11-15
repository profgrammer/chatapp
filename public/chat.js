$(function(){
	var socket = io.connect("localhost:3000");

	var username = $("#username");
	var message = $("#message");
	var send_message = $("#send_message");
	var send_username = $("#send_username");
	var chatroom = $("#chatroom");
	var feedback = $("#feedback");

	message.bind("keypress", function(){
		socket.emit("typing");
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

	socket.on("typing", function(data){
		feedback.html("<p><i>" + data.username + " is typing a message... </i></p>");
	});

});