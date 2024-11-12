import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  lastMessage: { type: String, required: true },
  unReadCount: { type: Number, default: 0 },
}, {
  timestamps: true,
  strict: false
});

const Chat = model('chat', schema);

export default Chat;