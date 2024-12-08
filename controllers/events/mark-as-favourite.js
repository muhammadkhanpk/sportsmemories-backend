import { Types } from 'mongoose';
import FavouriteData from '../../models/favourite-data';

const MarkAsFavourite = async ({ userId, dataType, eventId, url }) => {
  if (!userId) return { message: 'User ID is required', isFavourite: false };

  const query = dataType === 'event' ? { eventId, userId, dataType } : { url, userId };
  let favourite = await FavouriteData.findOne(query);

  if (favourite) {
    await FavouriteData.deleteOne(query);
    return {
      message: 'Removed from Favourites',
      isFavourite: false,
    };
  }

  favourite = new FavouriteData({
    _id: new Types.ObjectId().toHexString(),
    userId,
    dataType,
    eventId,
    url,
  });
  await favourite.save();

  return {
    message: 'Added to Favourites',
    isFavourite: true,
  };
};

export default MarkAsFavourite;
