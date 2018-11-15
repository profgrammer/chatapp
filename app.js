var express = require("express");
var app = express();
var http = require("http").Server(app);

app.set("view engine", "ejs");

app.use(express.static('public'));

app.get("/", function(req, res){
	res.render("index");
});


var server = app.listen(3000);

var io = require("socket.io")(server);


io.on('connection', function(socket){
	console.log("New user Connected!!");

	socket.username = "Anonymous";

	socket.on("change_username", function(data){
		socket.username = data.username;
	});

	socket.on("message_to_server", function(data){
		io.sockets.emit("display_message", {username: socket.username, message: data.message});
	});

	socket.on("typing", function(data){
		socket.broadcast.emit("typing", {username: socket.username});
	});

});