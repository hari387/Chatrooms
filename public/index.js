$(function(){
	var socket = io.connect();
	var room = '';
	$('#turnin').click(function(){
		room = $('#r').val();
		console.log(room);
		sessionStorage.setItem('room',room);
		window.location.href = '../public/chatroom.html';
	});
});