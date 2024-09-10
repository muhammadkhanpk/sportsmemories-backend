import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  eventId: { type: String, required: true },
  albumType: { type: String, required: true },
  media: { type: [String], required: true}
},{
  strict: false,
  timestamps: true,
});

const Album = model('album', schema);

export default Album;