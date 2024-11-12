import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  groupId: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isBlocked: { type: Boolean, default: false },
},{
  strict: false,
  timestamps: true,
});

const UserGroup = model('userGroup', schema);

export default UserGroup;