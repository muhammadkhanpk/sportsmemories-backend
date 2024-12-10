import { Types } from 'mongoose';
import Categories from '../../models/categories';

const SaveCategory = async({
  name,
  type
}) => {
  const category = new Categories({
    _id: new Types.ObjectId().toHexString(),
    name,
    type
  });
  await category.save();
  return category.toObject();
}

export default SaveCategory