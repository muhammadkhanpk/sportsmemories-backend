import FavouriteData from "../../models/favourite-data";

const GetUserFavourites = async ({ userId, dataType }) => {
  if (dataType === 'event') {
    let events = await FavouriteData.aggregate([
      {
        $match: {
          userId,
          dataType
        }
      },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event"
        }
      },
      {
        $unwind: {
          path: "$event"
        }
      }
    ]);
    return events;
  }
  const favourites = await FavouriteData.find({ userId, dataType });
  return favourites;
}

export default GetUserFavourites