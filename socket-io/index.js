import { Server } from "socket.io";
import http from "http";
import Chat from "../models/chat";
import Message from "../models/messages";
import { Types } from "mongoose";
import messages from "./constant";
import User from "../models/user";
import jwt from 'jsonwebtoken'

const getRoomId = ({ userId, partnerId }) => {
  return [userId, partnerId].sort().join("-");
};

const getUserAllRooms = async ({ userId }) => {
  let userChatRooms = await Chat.find({
    $or: [{ userId }, { partnerId: userId }],
  })
    .select({ roomId: 1, _id: 0 })
    .lean();
  userChatRooms = userChatRooms?.map((room) => room.roomId);
  return userChatRooms;
};

const getAllChats = async (userId) => {
  const chats = await Chat.aggregate([
    {
      $match: {
        $or: [{ userId }, { partnerId: userId }],
      },
    },
    {
      $group: {
        _id: "$roomId", // Group by roomId to get unique chats
        latestChat: { $first: "$$ROOT" }, // Take the first (latest) document in each group
      },
    },
    {
      $replaceRoot: { newRoot: "$latestChat" }, // Replace the root with the latestChat document
    },
    {
      $lookup: {
        from: "groups",
        localField: "roomId",
        foreignField: "_id",
        as: "groupInfo",
      },
    },
    {
      // Determine which ID to use based on the current user ID
      $addFields: {
        lookupField: {
          $cond: {
            if: { $eq: ["$userId", userId] },
            then: "$partnerId",
            else: "$userId",
          },
        },
      },
    },
    {
      // Perform the lookup using the dynamically determined field
      $lookup: {
        from: "users",
        localField: "lookupField",
        foreignField: "_id",
        as: "partnerInfo",
      },
    },
    {
      // Optionally remove the temporary field
      $project: {
        lookupField: 0,
      },
    },
    {
      // Count the number of members in the group and add 1
      $lookup: {
        from: "usergroups",
        let: { groupId: "$roomId" },
        pipeline: [
          { $match: { $expr: { $eq: ["$groupId", "$$groupId"] } } },
          { $count: "memberCount" },
        ],
        as: "memberCountInfo",
      },
    },
    {
      $addFields: {
        members: {
          $cond: {
            if: { $eq: ["$isGroup", true] },
            then: {
              $add: [{ $ifNull: [{ $arrayElemAt: ["$memberCountInfo.memberCount", 0] }, 0] }, 1],
            },
            else: null,
          },
        },
      },
    },
    {
      $addFields: {
        details: {
          $cond: {
            if: {
              $eq: ["$isGroup", true],
            },
            then: {
              $arrayElemAt: ["$groupInfo", 0],
            },
            else: {
              $ifNull: [
                {
                  $arrayElemAt: ["$partnerInfo", 0],
                },
                {
                  name: "Unknown",
                  avatar: null,
                },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        groupInfo: 0,
        partnerInfo: 0,
        memberCountInfo: 0
      },
    },
    { $sort: { updatedAt: -1 } }, // Sort by newest messages first
  ]);
  return chats;
}

export const createSocketServer = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Update with your frontend domain
      methods: ["GET", "POST"],
    },
  });

  // Secret key for verifying JWT
  const SECRET_KEY = process.env.HASHING_SECRET_KEY;

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error: Token is required"));
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
      if (err) {
        return next(new Error("Authentication error: Invalid token"));
      }
      const email = decoded?.email;
      const user = await User.findOne({ email });
      socket.user = user;
      next();
    });
  });

  const onlineUsers = new Map(); // Map userId to socketId

  io.on("connection", (socket) => {
    onlineUsers.set(socket.user._id, socket.id);

    // a specific room
    socket.on("joinRoom", async ({ userId, partnerId, roomId }) => {
      console.log("joinRoom ====> ", {
        userId,
        partnerId,
        roomId,
      });
      if (roomId) {
        socket.join(roomId);
      } else {
        const newRoomId = getRoomId({ userId, partnerId });
        socket.join(newRoomId);
      }
    });

    // join a user all rooms
    socket.on("joinUserAllRooms", async ({ userId }) => {
      const rooms = await getUserAllRooms({ userId });
      if (rooms?.length) {
        socket.join(rooms);
      }
    });

    socket.on("chats", async () => {
      try {
        //joining rooms when user fetch his conversation list
        const userId = socket.user._id;
        const rooms = await getUserAllRooms({ userId });
        if (rooms?.length) {
          socket.join(rooms);
        }
        // get user conversation
        const chats = await getAllChats(userId);
        socket.emit("receive-chats", chats);
      } catch (error) {
        console.error("Error processing chats:", error);
      }
    });

    socket.on(
      "send-message",
      async ({ roomId, partnerId, ...messageData }) => {
        const userId = socket.user._id;
        console.log('xxxx ===>', {roomId, partnerId, userId, user: socket.user})
        try {
          if (!roomId) {
            roomId = getRoomId({ userId, partnerId });
          }

          const { text, image, video } = messageData || {};
          // Update Chat

          await Chat.updateMany(
            {
              roomId,
            },
            {
              $set: {
                lastMessage: text || image || "",
                image,
              },
              $inc: { unReadCount: 1 },
            }
          );

          const query = {
            roomId,
            userId,
            ...(partnerId && { partnerId }), // Include partnerId only if it exists
          };
      
          await Chat.updateOne(
            query,
            {
              $setOnInsert: {
                _id: new Types.ObjectId().toHexString(),
              },
            },
            { upsert: true }
          );

          const { firstName, lastName, profileImage, _id } = socket.user || {};

          // Save Message
          const newMessage = await Message.create({
            _id: new Types.ObjectId().toHexString(),
            text,
            ...messageData,
            image,
            video,
            roomId,
            userId,
          });

          await newMessage.save();

          // Emit to the room
          io.to(roomId).emit("receive-messages", [
            {
              _id: newMessage._id,
              text: newMessage.text,
              createdAt: newMessage.createdAt,
              ...(image && { image }),
              ...(video && { video }),
              user: {
                name: `${firstName} ${lastName}`,
                avatar: profileImage || "",
                _id,
              },
            },
          ]);
          onlineUsers.forEach(async (socketId, userId) => {
            console.log('socket ids are', {socketId})
            const chats = await getAllChats(userId);
            socket.to(socketId).emit("receive-chats", chats);
          })
        } catch (error) {
          console.error("Error processing message:", error);
        }
      }
    );

    socket.on(
      "all-message-read",
      async ({ roomId }) => {
        const userId = socket.user._id;
        console.log('msg read data ====>', {roomId, userId})
        try {
          await Chat.updateOne({ roomId, userId }, {
            $set: {
              unReadCount: 0
            }
          })
        } catch (error) {
          console.error("Error processing message:", error);
        }
      }
    );



    socket.on(
      "message-history",
      async ({ roomId, page = 1, limit = 20, partnerId, userId }) => {
        try {
          if (!roomId) {
            roomId = getRoomId({ userId, partnerId });
          }
          //joining joining
          if (roomId) {
            socket.join(roomId);
          }

          const skip = (page - 1) * limit;

          console.log("message -history");

          const messages = await Message.aggregate([
            { $match: { roomId } }, // Filter by roomId
            { $sort: { createdAt: -1 } }, // Sort by newest messages first
            { $skip: skip }, // Skip messages for pagination
            { $limit: limit }, // Limit to the specified number of messages
            {
              $lookup: {
                from: "users", // The name of the User collection in your MongoDB
                localField: "userId", // Field in the Message model
                foreignField: "_id", // Field in the User model
                as: "user", // The name of the output field for user details
                pipeline: [
                  {
                    $addFields: {
                      name: { $concat: ["$firstName", " ", "$lastName"] }, // Concatenate firstName and lastName
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      name: 1, // Include the concatenated name
                      email: 1,
                      profileImage: 1, // Include only these fields
                    },
                  },
                ],
              },
            },
            {
              $unwind: "$user", // Unwind the array to get a single user object
            },
          ]);

          // Count total messages for the room
          const totalMessages = (await Message.countDocuments({ roomId })) || 0;

          const response = {
            messages: messages ?? [],
            totalPages: Math.ceil(totalMessages / limit),
            currentPage: page,
            totalMessages,
          };
          io.to(roomId).emit("receive-messages", response);
        } catch (error) {
          console.error("Error fetching messages with user name:", error);
          throw new Error("Unable to fetch messages");
        }
      }
    );

    //=========> sample code ======>
    socket.on("sample-message", async () => {
      console.log("message calling");
      io.emit("receive-sample-message", messages);
    });
    //=========> sample code ======>

      socket.on('disconnect', () => {
        onlineUsers.forEach((socketId, userId) => {
          console.log('ONLINE DETAILS ARE ====>', {userId, socketId, is: socket.id})
          if (socketId === socket.id) {
            console.log(`User disconnected: ${userId}`);
            onlineUsers.delete(userId);
          }
        });
        console.log('total online users are ===>', onlineUsers)
      });
  });

  return server;
};
