import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  url: { type: String, required: true },
  tags: { type: [String], required: true }
}, {
  timestamps: true,
  strict: false
});

const Tags = model('tags', schema);

export default Tags;