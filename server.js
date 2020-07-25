const express = require('express');
const path = require('path');

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.render('index.html');
});

let messages = [];

io.on('connection', (socket) => {
  socket.emit('previousMessages', messages);

  socket.on('sendMessage', (data) => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
  });
});

server.listen(3000);
