import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  eventId: { type: String, required: true },
  media: { type: [String], default: []}
});

const Album = new model('album', schema);

export default Album;