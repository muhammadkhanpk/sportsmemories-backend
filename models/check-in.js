import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  emotional: { type: Number, required: true },
  physical: { type: Number, required: true },
  behavioral: { type: Number, required: true },
  overallScore: { type: Number, required: true },
  intensityLevel: { type: String, required: true}
}, {
  timestamps: true,
  strict: false
});

const CheckIn = model('checkIn', schema);

export default CheckIn;