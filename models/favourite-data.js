import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  url: { type: String },
  dataType: { type: String, required: true },
  eventId: { type: String },
}, {
  timestamps: true,
  strict: false
});

const FavouriteData = model('favouriteData', schema);

export default FavouriteData;