var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 3000;
app.use('/public',express.static(__dirname+'/public'));
app.use('/Index',express.static(__dirname+'/Index'));
app.get('/',function(req, res){
	res.sendFile(__dirname + '/Index/index.html');
});

io.on('connection', function(socket){
	console.log('A client joined');

	socket.on('disconnect',function(){
		console.log('A client disconnected');
	});

	socket.on('join', function(room){
		console.log('joined ' + room);
		socket.join(room);
	});

	socket.on('chat message',function(msg, room, first){
		console.log('"'+msg + '"' + ' sent to ' + room);
		io.in(room).emit('chat message', msg);
	});

	socket.on('leave', function(room){
		socket.leave(room);
	});
});

server.listen(process.env.PORT || port,function(){
	console.log('Listening on: ' + port)
});