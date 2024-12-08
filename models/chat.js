import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  roomId: { type: String, required: true },
  partnerId: { type: String },
  isGroup: { type: Boolean },
  isUser: { type: Boolean },
  lastMessage: { type: String },
  unReadCount: { type: Number, default: 0 },
}, {
  timestamps: true,
  strict: false
});

const Chat = model('chat', schema);

export default Chat;