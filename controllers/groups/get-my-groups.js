import Group from "../../models/group";
import UserGroup from "../../models/user-groups";

const GetMyGroups = async ({ userId }) => {
  const myGroupsWithMembers = await Group.aggregate([
    {
      $match: { userId } // Match only groups created by the user
    },
    {
      $lookup: {
        from: "usergroups", // Name of the UserGroup collection
        localField: "_id", // Field in Group collection
        foreignField: "groupId", // Field in UserGroup collection
        as: "members" // Output array containing all members for this group
      }
    },
    {
      $addFields: {
        members: { $add: [{ $size: "$members" }, 1] } // Add 1 to the size of the members array
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        groupType:1,
        userId: 1,
        media: 1,
        members: 1 // Include only necessary fields
      }
    }
  ]);

  return myGroupsWithMembers;
};

export default GetMyGroups;
