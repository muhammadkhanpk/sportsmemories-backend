import { Server } from 'socket.io';
import http from 'http';
import Chat from '../models/chat';
import Message from '../models/messages';
import { Types } from 'mongoose';

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

    socket.on('joinRoom', async ({ userId, receiverId, isGroup, groupId }) => {
      let roomId = [userId, receiverId].sort().join('-');
      if (isGroup && groupId) {
        roomId = groupId
      }
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
    });

    socket.on('message', async ({ userId, receiverId, message, isGroup, groupId }) => {
      let roomId = [userId, receiverId].sort().join('-');
      if (isGroup && groupId) {
        roomId = groupId
      }

      await Chat.updateOne({
        _id: roomId
      }, {
        $set: {
          lastMessage: message,
        },
        $inc: {
          unReadCount: 1
        }
      }, {
        upsert: true,
      });

      await Message.updateOne({
        chatId: roomId
      }, {
        $setOnInsert: {
          _id: Types.ObjectId().toHexString()
        },
        $set: {
          message
        }
      }, {
        upsert: true
      })

      io.in(roomId).emit('receiveMessage', message);  // Emit to the room
    });

    socket.on('message', async ({ userId, receiverId, message, isGroup, groupId }) => {
      let roomId = [userId, receiverId].sort().join('-');
      if (isGroup && groupId) {
        roomId = groupId
      }

      io.in(roomId).emit('receiveMessage', message);  // Emit to the room
    });

    socket.on('disconnect', () => {
      console.log('A user is disconnected from the socket.');
    });
  });

  return server;
};
