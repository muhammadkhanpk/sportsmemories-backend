import Album from "../../models/album";

const GetAlbum = async({ albumId, eventId }) => {
  const album = await Album.findOne({ _id: albumId, eventId });
  return album;
}

export default GetAlbum