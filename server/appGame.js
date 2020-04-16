var app = require('express')();
const socket = require('socket.io')
const port = process.env.PORT || 3000
let server = app.listen(port, () => console.log('listening on port: ', port))

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });
var io = socket(server)
io.on('connection', function(socket){
  console.log('someone connected')
    socket.on('msgPlayer', function(msg){
        console.log(msg,"...player")
        socket.broadcast.emit('msgPlayer', msg)
    });
    socket.on('msgAttack', function(msg){
      console.log(msg, "attack")
      io.emit('msgAttack', msg) //ke semua
      //socket.broadcast.emit('msgAttack', msg) //ke semua kecuali diri sendiri
     });
    socket.on('msgDefense', function(msg){
      console.log(msg, "defense")
      io.emit('msgDefense', msg) //ke semua
      //socket.broadcast.emit('msgDefense', msg) //ke semua kecuali diri sendiri
     });
  });