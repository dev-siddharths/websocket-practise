const { io } = require('socket.io-client');

const socket = io('http://localhost:3000');

const ROOM_ID = 'room101';

socket.on('connect', () => {
  console.log('\nConnected to server!');
  console.log('Socket ID:', socket.id);

  // 1. Test global messaging
  socket.emit('message', 'Hello everyone!');

  // 2. Join a room
  socket.emit('joinRoom', {
    roomId: ROOM_ID,
  });

  console.log(`Requested to join ${ROOM_ID}`);

  // 3. Send a message to the room
  setTimeout(() => {
    socket.emit('sendToRoom', {
      roomId: ROOM_ID,
      message: 'Hello room members!',
    });

    console.log(`Sent message to ${ROOM_ID}`);
  }, 3000);
});

// Receive global messages
socket.on('newMessageToAll', (payload) => {
  console.log('\n[GLOBAL MESSAGE]', payload);
});

// Receive room messages
socket.on('newMessageToRoom', (payload) => {
  console.log('\n[ROOM MESSAGE]', payload);
});

// Connection error
socket.on('connect_error', (error) => {
  console.error('Connection failed:', error.message);
});

// Connection closed
socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});
