import { Types } from "mongoose";
import Categories from "../../models/categories";

const UpdateCategory = async ({
  id,
  name,
  type
}) => {
  const updatedCategory = await Categories.findOneAndUpdate(
    { _id: id },
    {
      $setOnInsert: {
        _id: new Types.ObjectId().toHexString(),
      },
      $set: {
        type,
        name
      },
    },
    {
      upsert: true,
      new: true, // Return the modified document
    }
  ).lean();
  return updatedCategory;
};

export default UpdateCategory;
