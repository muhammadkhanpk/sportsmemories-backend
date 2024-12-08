import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true }
}, {
  timestamps: true,
  strict: false
});

const CheckIn = model('checkIn', schema);

export default CheckIn;