import { Server } from 'socket.io';
import http from 'http';

export const createSocketServer = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",  // Ensure your frontend domain is allowed
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user is connected on socket ', socket.id);

    socket.on('joinRoom', ({ userId, partnerId }) => {
      const roomId = [userId, partnerId].sort().join('-');
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
    });

    socket.on('message', ({ userId, partnerId, message }) => {
      const roomId = [userId, partnerId].sort().join('-');
      console.log({ roomId, userId, partnerId, message });
      io.in(roomId).emit('receiveMessage', message);  // Emit to the room
    });

    socket.on('disconnect', () => {
      console.log('A user is disconnected from the socket.');
    });
  });

  return server;
};
