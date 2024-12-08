import UserGroup from "../../models/user-groups";

const GetUserJoinedGroups = async ({ userId }) => {
  const groups = await UserGroup.aggregate([
    {
      $match: {
        userId, // Filter by the user's ID
        isActive: true, // Only active memberships
        isBlocked: false // Exclude blocked groups
      }
    },
    {
      $lookup: {
        from: "groups", // Join with the Group collection
        localField: "groupId", // Match the `groupId` in UserGroup
        foreignField: "_id", // Match `_id` in Group
        as: "group" // Output array containing group details
      }
    },
    {
      $unwind: "$group" // Convert the `group` array into a flat object
    },
    {
      $match: {
        "group.status": true // Ensure the group is active
      }
    },
    {
      $lookup: {
        from: "usergroups", // Look up UserGroup collection to count members
        localField: "group._id", // Match groupId
        foreignField: "groupId", // Match the groupId in UserGroup
        as: "membersData" // Output array of members for this group
      }
    },
    {
      $addFields: {
        members: { $size: "$membersData" } // Calculate the size of the members array
      }
    },
    {
      $project: {
        _id: "$group._id", // Include the group's ID
        name: "$group.name", // Include the group's name
        description: "$group.description", // Include the group's description
        ownerId: "$group.userId", // Include the group's owner ID
        media: "$group.media", // Include the group's owner ID
        isActive: 1, // Include user's active membership status
        isBlocked: 1, // Include user's block status
        userId: 1, // Include the user's ID
        members: 1 // Include the member count
      }
    }
  ]);

  return groups;
};

export default GetUserJoinedGroups;
