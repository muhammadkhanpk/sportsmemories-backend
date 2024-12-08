import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  coachId: { type: String, required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  isPaymentActive: { type: Boolean, default: true },
  isPayout: { type: Boolean }
}, {
  timestamps: true,
  strict: false
});

const Payment = model('payment', schema);

export default Payment;