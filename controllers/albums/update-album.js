import Album from "../../models/album";

const UpdateAlbum = async({
  name,
  description,
  media,
  albumType,
  albumId
}) => {
  const updatedalbum = await Album.findOneAndUpdate({
    _id: albumId  
  }, {
    $set: {
      name,
      description,
      media,
      albumType
    }
  }, {
    new: true
  })
  return updatedalbum.toObject();
}

export default UpdateAlbum