import Group from "../../models/group";

const GetMyGroups = async({ userId }) => {
  const groups = await Group.find({ userId });
  return groups;
}

export default GetMyGroups