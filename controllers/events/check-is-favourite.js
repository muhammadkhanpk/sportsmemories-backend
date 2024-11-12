import FavouriteData from "../../models/favourite-data";

const CheckIsFavourite = async ({ eventId, userId, url }) => {
  if (!userId) return false;

  const query = {
    userId,
    $or: [
      { eventId: eventId || null },
      { url: url || null }
    ]
  };

  const favourite = await FavouriteData.findOne(query);
  return Boolean(favourite);
};

export default CheckIsFavourite;
