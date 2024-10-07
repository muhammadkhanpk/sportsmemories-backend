import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  groupId: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
},{
  strict: false,
  timestamps: true,
});

const Album = model('userGroup', schema);

export default Album;