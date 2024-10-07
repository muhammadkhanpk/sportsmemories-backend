import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  groupType: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: Boolean, default: true },
  media: { type: [String], required: true},
}, {
  timestamps: true,
  strict: false
});

const Group = model('group', schema);

export default Group;