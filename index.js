const gelf    = require('graygelf/server');
const server  = gelf();
const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);

app.use(express.static('public'));

server.on('message', message => io.emit('message', message));
server.on('error', console.error);

server.listen(12201);

http.listen(3456, function(){
  console.log('App listening on 3456');
});
