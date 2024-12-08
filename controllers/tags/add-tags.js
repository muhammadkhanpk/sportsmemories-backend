import { Types } from 'mongoose';
import Tags from '../../models/tags';

const addTag = async ({ url, tag }) => {
  // Ensure 'tag' is an array
  const tagsArray = Array.isArray(tag) ? tag : [tag];

  const updatedTags = await Tags.findOneAndUpdate(
    { url },
    {
      $setOnInsert: { _id: new Types.ObjectId().toHexString() },
      $addToSet: { tags: { $each: tagsArray } },
    },
    {
      upsert: true,
      new: true, // Returns the updated document
    }
  ).lean();
  return updatedTags
};

export default addTag;
