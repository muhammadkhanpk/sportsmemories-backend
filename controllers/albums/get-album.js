import Album from "../../models/album";

const GetAlbum = async({ albumId }) => {
  const album = await Album.findOne({ _id: albumId });
  return album;
}

export default GetAlbum