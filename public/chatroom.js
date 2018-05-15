$(function(){
	var socket = io.connect();
	var room = sessionStorage.getItem('room');
	$('#chat').text('Welcome to ' + room + '!')
	console.log(room);
	socket.emit('join',room);
	$(document).keypress(function(e){
		if(e.which == 13){
			console.log(room);
			socket.emit('chat message',$('#message').val(),room);
			$('#message').val('');
		}
	});

	socket.on('chat message', function(msg){
		console.log('message received');
		$('#chat').html($('#chat').html() + ' <br> ' + msg);
	});

	$('#back').click(function(){
		socket.emit('leave',room);
		sessionStorage.clear();
		window.location.href = '../Index/index.html';
	});
});