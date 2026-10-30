const { io } = require('socket.io-client');

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected:', socket.id);
  socket.emit('message', 'Hello from the client!');
});

socket.on('newMessage', (payload) => {
  console.log('New message received:', payload);
});

socket.on('connect_error', (error) => {
  console.error('Connection failed:', error.message);
});
