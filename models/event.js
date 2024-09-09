import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  media: { type: [String], default: []}
});

const Event = new model('event', schema);

export default Event;