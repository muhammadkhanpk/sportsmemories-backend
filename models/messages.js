import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  text: { type: String },
  userId: { type: String },
  roomId: { type: String, required: true },
}, {
  timestamps: true,
  strict: false
});

const Message = model('message', schema);

export default Message;