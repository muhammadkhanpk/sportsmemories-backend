import Group from "../../models/group";

const GetGroup = async({ groupId }) => {
  const group = await Group.findOne({ _id: groupId });
  return group;
}

export default GetGroup