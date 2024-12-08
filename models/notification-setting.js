import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  inbox: { type: Boolean, default: false },
  events: { type: Boolean, default: false },
  account: { type: Boolean, default: false },
  promotions: { type: Boolean, default: false },
}, {
  timestamps: true,
  strict: false
});

const NotificationSettings = model('notificationSettings', schema);

export default NotificationSettings;