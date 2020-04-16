const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

let rooms = [];

io.on('connection', (socket) => {
    socket.name = '';
    socket.room = null;
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        if(socket.room) {
            delete socket.room.players[socket.id];
            socket.leave(`room-${socket.room.id}`);
            socket.to(`room-${socket.room.id}`).emit('other player leave room', {
                name: socket.name
            });
        }
    });

    socket.on('set name', (name) => {
        socket.name = name;
        socket.emit('set name', {
            success: true,
            name: socket.name,
            message: `set name successful`
        });
        if(socket.room) {
            socket.room.players[socket.id].name = name;
            updateRoomData(socket.room);
        }
    });

    socket.on('get rooms', () => {
        let validrooms = rooms.map(room => {
            return {
                id: room.id,
                name: room.name,
            }
        });
        socket.emit('get rooms', validrooms);
    });

    socket.on('join room', (id) => {
        joinRoom(socket, id);
    });

    socket.on('create room', (name) => {
        let roomId = createNewRoom(name, socket.id);
        console.log('room created with name: ' + name);
        joinRoom(socket, roomId);
    });

    socket.on('leave room', (id) => {
        if(socket.room) {
            delete socket.room.players[socket.id];
            socket.leave(`room-${socket.room.id}`);
            socket.to(`room-${socket.room.id}`).emit('other player leave room', {
                name: socket.name
            });
            updateRoomData(socket.room);
            socket.emit('leave room', {
                success: true,
                message: `leave room successful`
            });
            socket.room = null;
        } else {
            socket.emit('leave room', {
                success: false,
                message: `you haven't joined a room`
            });
        }
    });

    socket.on('room chat', (msg) => {
        if(socket.room) {
            socket.to(`room-${socket.room.id}`).emit('room chat', {
                from: socket.name,
                msg: msg
            });
        }
    });
});

function joinRoom(socket, roomId) {
    if(!socket.room) {
        let foundRoom = null;
        for(const room of rooms) {
            if(room.id === Number(roomId)) {
                foundRoom = room;
                break;
            }
        }
        if(foundRoom) {
            if (Object.keys(foundRoom.players).length < 2) {
                socket.room = foundRoom;
                socket.join(`room-${socket.room.id}`);
                foundRoom.players[socket.id] = {
                    name: socket.name
                };
                socket.to(`room-${socket.room.id}`).emit('other player join room', {
                    name: socket.name
                });
                socket.emit('join room', {
                    success: true,
                    room: socket.room,
                    message: 'join room successful'
                })                
                console.log(`${socket.name} joined room ${socket.room.name}`);
                updateRoomData(socket.room);
            } else {
                socket.emit('join room', {
                    success: false,
                    message: 'room is full'
                });
            }
        } else {
            socket.emit('join room', {
                success: false,
                message: 'room not found'
            });
        }
    } else {
        socket.emit('join room', {
            success: false,
            message: 'leave your current room first'
        });
    }
}

function createNewRoom(name, gameMasterSocketId) {
    let newRoomId = getLastRoomId();
    let newRoomData = {
        id: newRoomId,
        name: name,
        gameMaster: gameMasterSocketId,
        players: {}
    };
    rooms.push(newRoomData);
    io.emit('new room', {
        id: newRoomData.id,
        name: newRoomData.name
    })
    return newRoomId;
}

function getLastRoomId() {
    if(rooms.length) {
        return rooms[rooms.length - 1].id + 1;
    } else {
        return 1;
    }
}

function updateRoomData(room) {
    let {id, name, players} = room;
    let viewableRoomData = {id, name, players};
    io.to(`room-${id}`).emit('update room data', viewableRoomData);
}

server.listen(port, () => console.log(`Server listening on port ${port}`));