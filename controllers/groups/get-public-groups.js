import Group from "../../models/group";
import UserGroup from "../../models/user-groups";

const GetPublicGroups = async ({ userId }) => {
  const groupsWithJoinStatus = await Group.aggregate([
    {
      $match: {
        userId: { $ne: userId } // Exclude groups created by the user
      }
    },
    {
      $lookup: {
        from: "usergroups", // The name of the UserGroup collection in the database
        let: { groupId: "$_id" }, // Pass the group ID to the subquery
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$groupId", "$$groupId"] }, // Match the group ID
                  { $eq: ["$userId", userId] } // Match the current user ID
                ]
              }
            }
          }
        ],
        as: "userGroupInfo" // Output array to check if the user has joined
      }
    },
    {
      $addFields: {
        isJoined: { $gt: [{ $size: "$userGroupInfo" }, 0] }, // If userGroupInfo array is not empty, user has joined
        members: { $add: [{ $size: "$userGroupInfo" }, 1] } // You can add or update members count here if needed
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        userId: 1,
        media: 1,
        isJoined: 1, // Include the isJoined field
        members: 1
      }
    }
  ]);

  return groupsWithJoinStatus;
};

export default GetPublicGroups;
