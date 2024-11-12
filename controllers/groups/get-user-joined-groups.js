import UserGroup from "../../models/user-groups";

const GetUserJoinedGroups = async({ userId }) => {
  const groups = await UserGroup.aggregate([
    {
      $match: {
        userId,
        isActive: true,
        isBlocked: false,
      }
    },
    {
      $lookup: {
        from: "groups",
        localField: "groupId",
        foreignField: "_id",
        as: "result"
      }
    },
    {
      $unwind: {
        path: "$result"
      }
    },
    {
      $replaceRoot: {
        newRoot: "$result"
      }
    },
    {
      $addFields: {
        groupOwnerUserID: "$userId",
        userId
      }
    },
    {
      $match: {
        status: true,
      }
    }
  ])
  return groups;
}

export default GetUserJoinedGroups