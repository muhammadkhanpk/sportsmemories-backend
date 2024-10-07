import { Types } from 'mongoose';
import Group from '../../models/group';

const CreateGroup = async({
  name,
  description,
  groupType,
  userId,
  media,
}) => {
  const group = new Group({
    _id: new Types.ObjectId().toHexString(),
    name,
    description,
    media,
    userId,
    groupType
  });
  await group.save();
  return group.toObject();
}

export default CreateGroup