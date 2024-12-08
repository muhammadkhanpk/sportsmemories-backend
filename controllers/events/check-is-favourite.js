import { extend } from 'lodash'

import FavouriteData from "../../models/favourite-data";

const CheckIsFavourite = async ({ eventId, userId, url, dataType }) => {
  const filter = {
    eventId,
    userId,
    dataType
  };

  if (url) {
    extend(filter, { url });
  }
  const favourite = await FavouriteData.findOne(filter);
  return Boolean(favourite);
};

export default CheckIsFavourite;
