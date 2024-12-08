import { Types } from 'mongoose';
import UserGroup from '../../models/user-groups';
import Chat from '../../models/chat';

const JoinGroup = async({
 userId,
 groupId
}) => {
  await Chat.updateOne(
    { roomId: groupId, userId },
    {
      $setOnInsert: {
        _id: new Types.ObjectId().toHexString(),
        lastMessage: ''
      },
      $set: { isGroup: true },
    },
    { upsert: true }
  );
  const alreadyJoined = await UserGroup.findOne({
    userId,
    groupId
  }).lean();

  if (alreadyJoined) {
    return alreadyJoined;
  }

  const joinGroup = new UserGroup({
    _id: new Types.ObjectId().toHexString(),
    userId,
    groupId
  });
  await joinGroup.save()

  return joinGroup.toObject();
}

export default JoinGroup