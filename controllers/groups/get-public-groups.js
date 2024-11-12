import Group from "../../models/group";
import UserGroup from "../../models/user-groups";

const GetPublicGroups = async({ userId }) => {
  const groups = await Group.find({ userId: { $ne: userId} }).lean();
  const groupData = groups.map(async (group) => {
    const count = await UserGroup.countDocuments({ groupId: group._id });
    return {
      ...group,
      members: count,
    }
  });
  return await Promise.all(groupData);
}

export default GetPublicGroups