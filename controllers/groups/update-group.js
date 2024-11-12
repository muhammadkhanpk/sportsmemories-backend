import Group from "../../models/group";

const UpdateGroup = async({
  name,
  description,
  groupType,
  userId,
  media,
  groupId
}) => {
  const updatedGroup = await Group.findOneAndUpdate({
    _id: groupId  
  }, {
    $set: {
      name,
      description,
      media,
      userId,
      groupType
    }
  }, {
    new: true
  })
  return updatedGroup.toObject();
}

export default UpdateGroup