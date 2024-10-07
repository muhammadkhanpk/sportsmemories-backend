import Album from "../../models/album";

const GetEventAlbums = async({ eventId }) => {
  const albums = await Album.find({ eventId });
  return albums;
}

export default GetEventAlbums