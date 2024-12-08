import Chat from '../../models/chat';
import Message from '../../models/messages';
import UserGroup from '../../models/user-groups';

const LeaveGroup = async({
 userId,
 groupId
}) => {
  const group = await UserGroup.findOne({
    userId,
    groupId
  });

  if (!group) {
    throw new Error('Group not found!');
  }

  await UserGroup.deleteOne({
    userId,
    groupId
  });
  await Chat.deleteOne({
    userId,
    roomId: groupId
  })
  await Message.deleteMany({
    userId,
    roomId: groupId
  })
}

export default LeaveGroup