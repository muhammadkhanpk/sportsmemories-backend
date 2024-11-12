import FavouriteData from "../../models/favourite-data";

const GetUserFavourites = async({ userId, dataType }) => {
  const favourites = await FavouriteData.find({ userId, dataType });
  return favourites;
}

export default GetUserFavourites