import { Types } from 'mongoose';
import Group from '../../models/group';
import Chat from '../../models/chat';

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
  //creating user empty chat when he create a new group
  const chat = new Chat({
    _id: new Types.ObjectId().toHexString(),
    roomId: group._id,
    userId,
    lastMessage: '',
    isGroup: true
  });
  await chat.save();
  return group.toObject();
}

export default CreateGroup