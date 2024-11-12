import UserGroup from '../../models/user-groups';
import Group from '../../models/group';

const DeleteGroup = async({
 groupId
}) => {
  await Group.deleteOne({ _id: groupId });
  await UserGroup.deleteMany({ groupId });
}

export default DeleteGroup