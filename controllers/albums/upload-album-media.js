import Album from "../../models/album";

const UploadAlbumMedia = async({
  albumId,
  newMedia
}) => {
  const updatedAlbum = await Album.findOneAndUpdate({
    _id: albumId  
  }, {
    $addToSet: { media: { $each: newMedia }}
  }, {
    new: true
  })
  return updatedAlbum.toObject();
}

export default UploadAlbumMedia