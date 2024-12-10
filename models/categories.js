import { Schema, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
}, {
  timestamps: true,
  strict: false
});

const Categories = model('categories', schema);

export default Categories;