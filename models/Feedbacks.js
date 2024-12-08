import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  userId: { type: String, required: true },
  isSolved: { type: Boolean, default: false }
}, {
  timestamps: true,
  strict: false
});

const Feedbacks = model('feedback', schema);

export default Feedbacks;