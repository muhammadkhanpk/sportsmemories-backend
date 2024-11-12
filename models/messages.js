import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  message: { type: String, required: true },
  chatId: { type: String, required: true },
}, {
  timestamps: true,
  strict: false
});

const Message = model('message', schema);

export default Message;