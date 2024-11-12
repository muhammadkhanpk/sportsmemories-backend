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
  })
}

export default LeaveGroup